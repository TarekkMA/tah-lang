import {
  BoundAssignmentExpression,
  BoundBinaryExpression,
  BoundBlockStatement,
  BoundCallExpression,
  BoundConversionExpression,
  BoundExpression,
  BoundExpressionStatement,
  BoundIfStatement,
  BoundLiteralExpression,
  BoundStatement,
  BoundUnaryExpression,
  BoundVariableDeclarationStatement,
  BoundVariableExpression,
  BoundWhileStatement,
} from '../binder/BoundNodes';
import {
  BoundBinaryOperatorKind,
  BoundUnaryOperatorKind,
} from '../binder/BoundOprators';
import { BuiltinFunctions } from '../symbols/FunctionSymbol';
import { TypeSymbol } from '../symbols/TypeSymbol';
import { VariableSymbol } from '../symbols/VariableSymbol';
import { EvaluatorConsole } from './EvaluatorConsole';

export class Evaluator {
  private lastValue: any;

  constructor(
    readonly root: BoundStatement,
    readonly variables: Map<VariableSymbol, any>,
    readonly evalConsole: EvaluatorConsole,
  ) {}

  async evaluate(): Promise<any> {
    await this.evaluateStatement(this.root);
    return this.lastValue;
  }

  async evaluateStatement(statement: BoundStatement): Promise<any> {
    if (statement instanceof BoundBlockStatement) {
      await this.evaluateBoundBlockStatement(statement);
    } else if (statement instanceof BoundVariableDeclarationStatement) {
      await this.evaluateBoundVariableDeclarationStatement(statement);
    } else if (statement instanceof BoundExpressionStatement) {
      await this.evaluateExpressionStatement(statement);
    } else if (statement instanceof BoundIfStatement) {
      await this.evaluateBoundIfStatement(statement);
    } else if (statement instanceof BoundWhileStatement) {
      await this.evaluateBoundWhileStatement(statement);
    } else {
      throw new Error(`Unexpexted statemnt ${statement.constructor.name}`);
    }
  }
  async evaluateBoundWhileStatement(
    statement: BoundWhileStatement,
  ): Promise<any> {
    while (await this.evaluateExpression(statement.condition)) {
      await this.evaluateStatement(statement.body);
    }
  }
  async evaluateBoundIfStatement(statement: BoundIfStatement): Promise<any> {
    if (this.evaluateExpression(statement.condition)) {
      await this.evaluateStatement(statement.thenStatement);
    } else if (statement.elseStatement != undefined) {
      await this.evaluateStatement(statement.elseStatement);
    }
  }

  async evaluateBoundBlockStatement(
    blockStatement: BoundBlockStatement,
  ): Promise<any> {
    for (const statement of blockStatement.statements) {
      await this.evaluateStatement(statement);
    }
  }

  async evaluateBoundVariableDeclarationStatement(
    statement: BoundVariableDeclarationStatement,
  ): Promise<any> {
    const value = statement.initializer
      ? await this.evaluateExpression(statement.initializer)
      : undefined;
    this.variables.set(statement.variable, value);
    this.lastValue = value;
  }

  async evaluateExpressionStatement(
    statement: BoundExpressionStatement,
  ): Promise<any> {
    this.lastValue = await this.evaluateExpression(statement.expression);
  }

  async evaluateExpression(expression: BoundExpression): Promise<any> {
    if (expression instanceof BoundLiteralExpression) {
      return this.evaluateBoundLiteralExpression(expression);
    } else if (expression instanceof BoundVariableExpression) {
      return this.evaluateBoundVariableExpression(expression);
    } else if (expression instanceof BoundAssignmentExpression) {
      return this.evaluateBoundAssignmentExpression(expression);
    } else if (expression instanceof BoundUnaryExpression) {
      return this.evaluateBoundUnaryExpression(expression);
    } else if (expression instanceof BoundBinaryExpression) {
      return this.evaluateBoundBinaryExpression(expression);
    } else if (expression instanceof BoundCallExpression) {
      return this.evaluateCallExpression(expression);
    } else if (expression instanceof BoundConversionExpression) {
      return this.evaluateConversionExpression(expression);
    } else {
      throw new Error(`Unexpexted expression ${expression.constructor.name}`);
    }
  }
  async evaluateConversionExpression(
    convExpr: BoundConversionExpression,
  ): Promise<any> {
    const value = await this.evaluateExpression(convExpr.expression);
    if (convExpr.type == TypeSymbol.Boolean) return Boolean(value);
    if (convExpr.type == TypeSymbol.String) return String(value);
    if (convExpr.type == TypeSymbol.Number) return Number(value);
    throw new Error(`Unexpected type '${convExpr.type.name}'`);
  }

  async evaluateCallExpression(expression: BoundCallExpression): Promise<any> {
    if (expression.func == BuiltinFunctions.print) {
      const message = await this.evaluateExpression(expression.parameters[0]);
      this.evalConsole.print(message);
      return;
    }
    if (expression.func == BuiltinFunctions.println) {
      const message = await this.evaluateExpression(expression.parameters[0]);
      this.evalConsole.print(message + '\n');
      return;
    }
    if (expression.func == BuiltinFunctions.input) {
      const message = await this.evaluateExpression(expression.parameters[0]);
      const value = await this.evalConsole.input(message);
      return value;
    }
    if (expression.func == BuiltinFunctions.rnd) {
      const max = (await this.evaluateExpression(
        expression.parameters[0],
      )) as number;
      return Math.random() * max;
    }
  }
  async evaluateBoundLiteralExpression(
    literal: BoundLiteralExpression<any>,
  ): Promise<any> {
    return literal.value;
  }
  async evaluateBoundVariableExpression(
    expression: BoundVariableExpression,
  ): Promise<any> {
    return this.variables.get(expression.variable);
  }
  async evaluateBoundAssignmentExpression(
    expression: BoundAssignmentExpression,
  ): Promise<any> {
    const value = await this.evaluateExpression(expression.expression);
    this.variables.set(expression.variable, value);
    return value;
  }
  async evaluateBoundUnaryExpression(
    expression: BoundUnaryExpression,
  ): Promise<any> {
    const operandValue = await this.evaluateExpression(expression.operand);
    switch (expression.oprator.kind) {
      case BoundUnaryOperatorKind.Identity:
        return operandValue;
      case BoundUnaryOperatorKind.Negation:
        return -operandValue;
      case BoundUnaryOperatorKind.LogicalNegation:
        return !operandValue;
      default:
        throw new Error(
          `Unexpected unary operator ${
            BoundUnaryOperatorKind[expression.oprator.kind]
          }`,
        );
    }
  }
  async evaluateBoundBinaryExpression(
    expression: BoundBinaryExpression,
  ): Promise<any> {
    const leftValue = await this.evaluateExpression(expression.left);
    const rightValue = await this.evaluateExpression(expression.right);

    switch (expression.operator.kind) {
      case BoundBinaryOperatorKind.Addition:
        return leftValue + rightValue;
      case BoundBinaryOperatorKind.Subtraction:
        return leftValue - rightValue;
      case BoundBinaryOperatorKind.Multiplication:
        return leftValue * rightValue;
      case BoundBinaryOperatorKind.Division:
        return leftValue / rightValue;
      case BoundBinaryOperatorKind.Remainder:
        return leftValue % rightValue;
      case BoundBinaryOperatorKind.LogicalAnd:
        return leftValue && rightValue;
      case BoundBinaryOperatorKind.LogicalOr:
        return leftValue || rightValue;
      case BoundBinaryOperatorKind.Equals:
        return leftValue == rightValue;
      case BoundBinaryOperatorKind.Addition:
        return leftValue != rightValue;
      case BoundBinaryOperatorKind.LessThan:
        return leftValue < rightValue;
      case BoundBinaryOperatorKind.GreaterThan:
        return leftValue > rightValue;
      case BoundBinaryOperatorKind.LessThanOrEqualsTo:
        return leftValue <= rightValue;
      case BoundBinaryOperatorKind.GreaterThanOrEqualsTo:
        return leftValue >= rightValue;
      case BoundBinaryOperatorKind.Concatination:
        return leftValue + rightValue;
      default:
        throw new Error(
          `Unexpected unary operator ${
            BoundBinaryOperatorKind[expression.operator.kind]
          }`,
        );
    }
  }
}
