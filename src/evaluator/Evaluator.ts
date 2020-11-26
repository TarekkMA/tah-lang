import { stat } from 'fs';
import {
  BoundAssignmentExpression,
  BoundBinaryExpression,
  BoundBlockStatement,
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
import {
  AssignmentExpression,
  Expression,
  ExpressionStatement,
} from '../parser/Nodes';
import { VariableSymbol } from '../Variable';

export class Evaluator {
  private lastValue: any;

  constructor(
    readonly root: BoundStatement,
    readonly variables: Map<VariableSymbol, any>,
  ) {}

  evaluate(): any {
    this.evaluateStatement(this.root);
    return this.lastValue;
  }

  evaluateStatement(statement: BoundStatement) {
    if (statement instanceof BoundBlockStatement) {
      this.evaluateBoundBlockStatement(statement);
    } else if (statement instanceof BoundVariableDeclarationStatement) {
      this.evaluateBoundVariableDeclarationStatement(statement);
    } else if (statement instanceof BoundExpressionStatement) {
      this.evaluateExpressionStatement(statement);
    } else if (statement instanceof BoundIfStatement) {
      this.evaluateBoundIfStatement(statement);
    } else if (statement instanceof BoundWhileStatement) {
      this.evaluateBoundWhileStatement(statement);
    } else {
      throw new Error(`Unexpexted statemnt ${statement.constructor.name}`);
    }
  }
  evaluateBoundWhileStatement(statement: BoundWhileStatement) {
    while (this.evaluateExpression(statement.condition)) {
      this.evaluateStatement(statement.body);
    }
  }
  evaluateBoundIfStatement(statement: BoundIfStatement) {
    if (this.evaluateExpression(statement.condition)) {
      this.evaluateStatement(statement.thenStatement);
    } else if (statement.elseStatement != undefined) {
      this.evaluateStatement(statement.elseStatement);
    }
  }

  evaluateBoundBlockStatement(blockStatement: BoundBlockStatement) {
    for (const statement of blockStatement.statements) {
      this.evaluateStatement(statement);
    }
  }

  evaluateBoundVariableDeclarationStatement(
    statement: BoundVariableDeclarationStatement,
  ) {
    const value = statement.initializer
      ? this.evaluateExpression(statement.initializer)
      : undefined;
    this.variables.set(statement.variable, value);
    this.lastValue = value;
  }

  evaluateExpressionStatement(statement: BoundExpressionStatement) {
    this.lastValue = this.evaluateExpression(statement.expression);
  }

  evaluateExpression(expression: BoundExpression): any {
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
    } else {
      throw new Error(`Unexpexted expression ${expression.constructor.name}`);
    }
  }
  evaluateBoundLiteralExpression(literal: BoundLiteralExpression<any>): any {
    return literal.value;
  }
  evaluateBoundVariableExpression(expression: BoundVariableExpression): any {
    return this.variables.get(expression.variable);
  }
  evaluateBoundAssignmentExpression(
    expression: BoundAssignmentExpression,
  ): any {
    const value = this.evaluateExpression(expression.expression);
    this.variables.set(expression.variable, value);
    return value;
  }
  evaluateBoundUnaryExpression(expression: BoundUnaryExpression): any {
    const operandValue = this.evaluateExpression(expression.operand);
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
  evaluateBoundBinaryExpression(expression: BoundBinaryExpression): any {
    const leftValue = this.evaluateExpression(expression.left);
    const rightValue = this.evaluateExpression(expression.right);

    switch (expression.operator.kind) {
      case BoundBinaryOperatorKind.Addition:
        return leftValue + rightValue;
      case BoundBinaryOperatorKind.Subtraction:
        return leftValue - rightValue;
      case BoundBinaryOperatorKind.Multiplication:
        return leftValue * rightValue;
      case BoundBinaryOperatorKind.Division:
        return leftValue / rightValue;
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
      default:
        throw new Error(
          `Unexpected unary operator ${
            BoundBinaryOperatorKind[expression.operator.kind]
          }`,
        );
    }
  }
}
