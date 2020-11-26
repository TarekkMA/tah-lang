import { Diagnostic } from '../Diagnostic';
import { TokenType } from '../lexer/token';
import { CompilationUnit } from '../parser/CompilationUnit';
import {
  AssignmentExpression,
  BinaryExpression,
  BlockStatement,
  BooleanLiteralExpression,
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
import {
  VariableSymbol,
  VariableType,
  variableTypeFromTokenType,
} from '../Variable';
import {
  BoundAssignmentExpression,
  BoundBinaryExpression,
  BoundBlockStatement,
  BoundBooleanLiteral,
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

export class Binder {
  public diagnostics: Diagnostic[] = [];
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
    const diagnostics = (previous?.diagnostics || []).concat(
      binder.diagnostics,
    );

    return new BoundGlobalScope(diagnostics, variables, statment, previous);
  }

  static createParentScope(
    previous?: BoundGlobalScope,
  ): BoundScope | undefined {
    const stack: BoundGlobalScope[] = [];
    while (previous != undefined) {
      stack.push(previous);
      previous = previous.previous;
    }

    let parent: BoundScope | undefined = undefined;

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

    let type: VariableType;

    if (statement.asTypePart != undefined) {
      const typeFromToken = variableTypeFromTokenType(
        statement.asTypePart.typeToken.type,
      );

      if (initializer != undefined && initializer.type != typeFromToken) {
        this.diagnostics.push(
          new Diagnostic(
            statement.initializerPart!.equalsToken.getTextSpan(),
            `${
              VariableType[initializer.type]
            } cannot be assigned to a variable of type ${
              VariableType[typeFromToken]
            }`,
          ),
        );
      }

      type = typeFromToken;
    } else if (initializer != undefined) {
      type = initializer.type;
    }

    const variable = new VariableSymbol(isReadOnly, name, type!);

    if (!this.scope?.tryDeclare(variable)) {
      this.diagnostics.push(
        new Diagnostic(
          statement.identifier.getTextSpan(),
          `Variable with the name ${name} already declared`,
        ),
      );
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
      VariableType.Boolean,
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
      VariableType.Boolean,
    );
    const boundBody = this.bindStatement(statement.body);
    return new BoundWhileStatement(boundCondition, boundBody);
  }

  private bindExpressionWithExpectedType(
    expression: Expression,
    expectedType: VariableType,
  ): BoundExpression {
    const boundExpression = this.bindExpression(expression);
    if (boundExpression.type != expectedType) {
      this.diagnostics.push(
        new Diagnostic(
          expression.textSpan,
          `exptexted the expression to evaluate to ${
            VariableType[expectedType]
          } but it did evaluate to ${VariableType[boundExpression.type]}.`,
        ),
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
    }
    throw new Error(
      `Unexpected expression type ${expression.constructor.name}`,
    );
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
      this.diagnostics.push(
        new Diagnostic(
          expression.identifier.getTextSpan(),
          `Cannot find a variable with the name ${name}.`,
        ),
      );
      return new BoundNumberLiteralExpression(0);
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
      this.diagnostics.push(
        new Diagnostic(
          expression.identifier.getTextSpan(),
          `Cannot find a variable with the name ${name}.`,
        ),
      );
      return boundExpression;
    }

    if (variable.isReadOnly) {
      this.diagnostics.push(
        new Diagnostic(
          expression.identifier.getTextSpan(),
          `${name} is a read only variable.`,
        ),
      );
    }

    if (boundExpression.type != variable.type) {
      this.diagnostics.push(
        new Diagnostic(
          expression.identifier.getTextSpan(),
          `${
            VariableType[boundExpression.type]
          } cannot be assigned to a variable of type ${
            VariableType[variable.type]
          }`,
        ),
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

    if (boundOperator == null) {
      this.diagnostics.push(
        new Diagnostic(
          expression.operator.getTextSpan(),
          `Unary operator '${
            expression.operator.text
          }' is not defined for type ${VariableType[boundOperand.type]}.`,
        ),
      );
      return boundOperand;
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

    if (boundOperator == null) {
      this.diagnostics.push(
        new Diagnostic(
          expression.oprator.getTextSpan(),
          `Binary operator '${
            expression.oprator.text
          }' is not defined for types ${VariableType[boundLeft.type]} and ${
            VariableType[boundRight.type]
          }.`,
        ),
      );
      return boundLeft;
    }

    return new BoundBinaryExpression(boundLeft, boundOperator, boundRight);
  }
}
