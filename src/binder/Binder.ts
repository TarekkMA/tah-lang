import { Diagnostic, Diagnostics } from '../diagnostics/Diagnostic';
import { TokenType } from '../lexer/token';
import { CompilationUnit } from '../parser/CompilationUnit';
import {
  AssignmentExpression,
  BinaryExpression,
  BlockStatement,
  BooleanLiteralExpression,
  CallExpression,
  ErrorExpression,
  Expression,
  ExpressionStatement,
  IfStatement,
  LiteralExpression,
  NameExpression,
  NumberLiteralExpression,
  ParenthesizedExpression,
  Statement,
  StringLiteralExpression,
  UnaryExpression,
  VariableDeclarationStatement,
  WhileStatement,
} from '../parser/Nodes';
import { VariableSymbol } from '../symbols/VariableSymbol';
import { TypeSymbol, typeSymbolFromTokenType } from '../symbols/TypeSymbol';
import {
  BoundAssignmentExpression,
  BoundBinaryExpression,
  BoundBlockStatement,
  BoundBooleanLiteral,
  BoundCallExpression,
  BoundErrorExpression,
  BoundExpression,
  BoundExpressionStatement,
  BoundIfStatement,
  BoundLiteralExpression,
  BoundNumberLiteralExpression,
  BoundStatement,
  BoundStringLiteralExpression,
  BoundUnaryExpression,
  BoundVariableDeclarationStatement,
  BoundVariableExpression,
  BoundWhileStatement,
} from './BoundNodes';
import { BoundBinaryOperator, BoundUnaryOperator } from './BoundOprators';
import { BoundGlobalScope, BoundScope } from './Scopes';
import { BuiltinFunctions, FunctionSymbol } from '../symbols/FunctionSymbol';

export class Binder {
  public diagnostics = new Diagnostics();
  private scope: BoundScope;

  constructor(parentScope?: BoundScope) {
    this.scope = new BoundScope(parentScope);
  }

  static bindGlobalScope(
    compilationUnit: CompilationUnit,
    previous?: BoundGlobalScope,
  ): BoundGlobalScope {
    const scope = this.createParentScope(previous);
    const binder = new Binder(scope);
    const statment = binder.bindStatement(compilationUnit.statement);
    const variables = binder.scope?.getDeclaredVariables() || [];
    const diagnostics = new Diagnostics();
    if (previous?.diagnostics) {
      diagnostics.addDiagnostics(diagnostics);
    }
    diagnostics.addDiagnostics(binder.diagnostics);

    return new BoundGlobalScope(diagnostics, variables, statment, previous);
  }

  static createParentScope(previous?: BoundGlobalScope): BoundScope {
    const stack: BoundGlobalScope[] = [];
    while (previous != undefined) {
      stack.push(previous);
      previous = previous.previous;
    }

    let parent: BoundScope = this.createRootScopee();

    while (stack.length > 0) {
      previous = stack.pop();
      const scope: BoundScope = new BoundScope(parent);
      for (const v of previous?.variables || []) {
        scope.tryDeclare(v);
      }
      parent = scope;
    }

    return parent;
  }

  private static createRootScopee(): BoundScope {
    const scope = new BoundScope();
    BuiltinFunctions.getAll().forEach((f) => {
      scope.tryDeclare(f);
    });
    return scope;
  }

  private bindStatement(statement: Statement): BoundStatement {
    if (statement instanceof BlockStatement) {
      return this.bindBlockStatement(statement);
    } else if (statement instanceof VariableDeclarationStatement) {
      return this.bindVariableDeclarationStatement(statement);
    } else if (statement instanceof ExpressionStatement) {
      return this.bindExpressionStatement(statement);
    } else if (statement instanceof IfStatement) {
      return this.bindIfStatement(statement);
    } else if (statement instanceof WhileStatement) {
      return this.bindWhileStatement(statement);
    }
    throw new Error(
      `Unexprected statement type "${statement.constructor.name}"`,
    );
  }

  private bindBlockStatement(block: BlockStatement): BoundBlockStatement {
    const statements: BoundStatement[] = [];

    this.scope = new BoundScope(this.scope);
    for (const statementNode of block.statements) {
      const statementBound = this.bindStatement(statementNode);
      statements.push(statementBound);
    }
    this.scope = this.scope.parent!;

    return new BoundBlockStatement(statements);
  }

  private bindVariableDeclarationStatement(
    statement: VariableDeclarationStatement,
  ): BoundVariableDeclarationStatement {
    const name = statement.identifier.text!;
    const isReadOnly = statement.keywordToken.type == TokenType.ValKeyword;
    const initializer = statement.initializerPart
      ? this.bindExpression(statement.initializerPart.initializer)
      : undefined;

    let type: TypeSymbol;

    if (statement.asTypePart != undefined) {
      const typeFromToken = typeSymbolFromTokenType(
        statement.asTypePart.typeToken.type,
      );

      if (initializer != undefined && initializer.type != typeFromToken) {
        this.diagnostics.reportCannotConvert(
          statement.initializerPart!.equalsToken.textSpan,
          initializer.type,
          typeFromToken,
        );
      }

      type = typeFromToken;
    } else if (initializer != undefined) {
      type = initializer.type;
    }

    const variable = new VariableSymbol(isReadOnly, name, type!);

    if (!this.scope?.tryDeclare(variable)) {
      this.diagnostics.reportVariableAlreadyDeclared(statement.identifier);
    }

    return new BoundVariableDeclarationStatement(variable, initializer);
  }

  private bindExpressionStatement(
    statement: ExpressionStatement,
  ): BoundExpressionStatement {
    const expression = this.bindExpression(statement.expression);
    return new BoundExpressionStatement(expression);
  }

  private bindIfStatement(statement: IfStatement): BoundIfStatement {
    const boundCondition = this.bindExpressionWithExpectedType(
      statement.condition,
      TypeSymbol.Boolean,
    );
    const boundThen = this.bindStatement(statement.thenStatement);
    const boundElse = !statement.elseClause
      ? undefined
      : this.bindStatement(statement.elseClause.elseStatement);
    return new BoundIfStatement(boundCondition, boundThen, boundElse);
  }
  private bindWhileStatement(statement: WhileStatement): BoundWhileStatement {
    const boundCondition = this.bindExpressionWithExpectedType(
      statement.condition,
      TypeSymbol.Boolean,
    );
    const boundBody = this.bindStatement(statement.body);
    return new BoundWhileStatement(boundCondition, boundBody);
  }

  private bindExpressionWithExpectedType(
    expression: Expression,
    expectedType: TypeSymbol,
  ): BoundExpression {
    const boundExpression = this.bindExpression(expression);
    if (boundExpression.type != expectedType) {
      this.diagnostics.reportCannotConvert(
        expression.textSpan,
        boundExpression.type,
        expectedType,
      );
    }
    return boundExpression;
  }

  private bindExpression(expression: Expression): BoundExpression {
    if (expression instanceof ParenthesizedExpression) {
      return this.bindParenthesizedExpression(expression);
    } else if (expression instanceof LiteralExpression) {
      return this.bindLiteralExpression(expression);
    } else if (expression instanceof NameExpression) {
      return this.bindNameExpression(expression);
    } else if (expression instanceof AssignmentExpression) {
      return this.bindAssignmentExpression(expression);
    } else if (expression instanceof UnaryExpression) {
      return this.bindUnaryExpression(expression);
    } else if (expression instanceof BinaryExpression) {
      return this.bindBinaryExpression(expression);
    } else if (expression instanceof CallExpression) {
      return this.bindCallExpression(expression);
    } else if (expression instanceof ErrorExpression) {
      return new BoundErrorExpression();
    }
    throw new Error(
      `Unexpected expression type ${expression.constructor.name}`,
    );
  }

  private bindCallExpression(callExpression: CallExpression): BoundExpression {
    let v: VariableSymbol | null = null;
    if (
      (v = this.scope?.tryLookup(callExpression.identifier.text!) ?? null) ==
      null
    ) {
      this.diagnostics.reportUndefinedName(callExpression.identifier);
      return new BoundErrorExpression();
    }

    if (v instanceof FunctionSymbol == false) {
      this.diagnostics.reportCannotCallName(
        callExpression.textSpan,
        v.name,
        v.type,
      );
      return new BoundErrorExpression();
    }
    const func = v as FunctionSymbol;

    if (callExpression.parameters.length != func.parameters.length) {
      this.diagnostics.reportWrongArgumentsCount(
        callExpression.textSpan,
        callExpression.identifier.text!,
        func.parameters.length,
        callExpression.parameters.length,
      );
      return new BoundErrorExpression();
    }
    const boundParams: BoundExpression[] = [];

    for (let i = 0; i < callExpression.parameters.length; i++) {
      const node = callExpression.parameters.nodeAt(i);
      const param = func.parameters[i];
      const boundExpr = this.bindExpression(node);
      boundParams.push(boundExpr);

      if (boundExpr.type != param.type) {
        this.diagnostics.reportWrongArgumentType(
          node.textSpan,
          param.name,
          param.type,
          boundExpr.type,
        );
        return new BoundErrorExpression();
      }
    }

    return new BoundCallExpression(func, boundParams);
  }

  private bindParenthesizedExpression(
    expression: ParenthesizedExpression,
  ): BoundExpression {
    return this.bindExpression(expression.expression);
  }

  private bindLiteralExpression(
    expression: LiteralExpression<any>,
  ): BoundLiteralExpression<any> {
    if (expression instanceof StringLiteralExpression) {
      return new BoundStringLiteralExpression(expression.value);
    } else if (expression instanceof NumberLiteralExpression) {
      return new BoundNumberLiteralExpression(expression.value);
    } else if (expression instanceof BooleanLiteralExpression) {
      return new BoundBooleanLiteral(expression.value);
    }
    throw new Error(
      `Unexpected literal expression type ${expression.constructor.name}`,
    );
  }

  private bindNameExpression(expression: NameExpression): BoundExpression {
    const name = expression.identifier.text!;

    let variable: VariableSymbol | null = null;
    if ((variable = this.scope?.tryLookup(name) ?? null) == null) {
      this.diagnostics.reportUndefinedName(expression.identifier);
      return new BoundErrorExpression();
    }

    return new BoundVariableExpression(variable);
  }

  private bindAssignmentExpression(
    expression: AssignmentExpression,
  ): BoundExpression {
    const name = expression.identifier.text!;
    const boundExpression = this.bindExpression(expression.expression);

    let variable: VariableSymbol | null = null;
    if ((variable = this.scope?.tryLookup(name) ?? null) == null) {
      this.diagnostics.reportUndefinedName(expression.identifier);
      return new BoundErrorExpression();
    }

    if (variable.isReadOnly) {
      this.diagnostics.reportCannotAssignReadonly(
        expression.textSpan,
        variable.name,
      );
    }

    if (boundExpression.type != variable.type) {
      this.diagnostics.reportCannotConvert(
        expression.textSpan,
        boundExpression.type,
        variable.type,
      );
      return boundExpression;
    }

    return new BoundAssignmentExpression(variable, boundExpression);
  }

  private bindUnaryExpression(expression: UnaryExpression): BoundExpression {
    const boundOperand = this.bindExpression(expression.operand);
    const boundOperator = BoundUnaryOperator.tryBind(
      expression.operator.type,
      boundOperand.type,
    );

    if (boundOperand.type == TypeSymbol.Error) {
      return new BoundErrorExpression();
    }

    if (boundOperator == null) {
      this.diagnostics.reportUndefinedUnaryOperator(
        expression.operator.textSpan,
        expression.operator.text!,
        boundOperand.type,
      );
      return new BoundErrorExpression();
    }

    return new BoundUnaryExpression(boundOperator, boundOperand);
  }

  private bindBinaryExpression(expression: BinaryExpression): BoundExpression {
    const boundLeft = this.bindExpression(expression.left);
    const boundRight = this.bindExpression(expression.right);

    const boundOperator = BoundBinaryOperator.tryBind(
      expression.oprator.type,
      boundLeft.type,
      boundRight.type,
    );

    if (
      boundLeft.type == TypeSymbol.Error ||
      boundRight.type == TypeSymbol.Error
    ) {
      return new BoundErrorExpression();
    }

    if (boundOperator == null) {
      this.diagnostics.reportUndefinedBinaryOperator(
        expression.oprator.textSpan,
        expression.oprator.text!,
        boundLeft.type,
        boundRight.type,
      );
      return new BoundErrorExpression();
    }

    return new BoundBinaryExpression(boundLeft, boundOperator, boundRight);
  }
}
