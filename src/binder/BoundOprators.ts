import { TokenType } from '../lexer/token';
import { VariableType } from '../Variable';

export enum BoundBinaryOperatorKind {
  Addition,
  Subtraction,
  Multiplication,
  Division,
  LogicalAnd,
  LogicalOr,
  Equals,
  NotEquals,
  LessThan,
  LessThanOrEqualsTo,
  GreaterThan,
  GreaterThanOrEqualsTo,
  Concatination,
}

export class BoundBinaryOperator {
  readonly operatorTokenType: TokenType;
  readonly kind: BoundBinaryOperatorKind;
  readonly leftType: VariableType;
  readonly resultType: VariableType;
  readonly rightType: VariableType;

  private constructor(
    operatorTokenType: TokenType,
    kind: BoundBinaryOperatorKind,
    leftType: VariableType,
    rightType: VariableType,
    resultType: VariableType,
  ) {
    this.operatorTokenType = operatorTokenType;
    this.kind = kind;
    this.leftType = leftType;
    this.rightType = rightType;
    this.resultType = resultType;
  }

  static tryBind(
    operatorTokenType: TokenType,
    leftType: VariableType,
    rightType: VariableType,
  ): BoundBinaryOperator | null {
    for (let i = 0; i < this.operators.length; i++) {
      const op = this.operators[i];
      if (
        op.operatorTokenType == operatorTokenType &&
        op.leftType == leftType &&
        op.rightType == rightType
      )
        return op;
    }
    return null;
  }

  private static readonly operators: BoundBinaryOperator[] = [
    new BoundBinaryOperator(
      TokenType.Plus,
      BoundBinaryOperatorKind.Addition,
      VariableType.Number,
      VariableType.Number,
      VariableType.Number,
    ),
    new BoundBinaryOperator(
      TokenType.Minus,
      BoundBinaryOperatorKind.Subtraction,
      VariableType.Number,
      VariableType.Number,
      VariableType.Number,
    ),
    new BoundBinaryOperator(
      TokenType.Star,
      BoundBinaryOperatorKind.Multiplication,
      VariableType.Number,
      VariableType.Number,
      VariableType.Number,
    ),
    new BoundBinaryOperator(
      TokenType.Slash,
      BoundBinaryOperatorKind.Division,
      VariableType.Number,
      VariableType.Number,
      VariableType.Number,
    ),

    new BoundBinaryOperator(
      TokenType.EqualEqual,
      BoundBinaryOperatorKind.Equals,
      VariableType.Number,
      VariableType.Number,
      VariableType.Boolean,
    ),
    new BoundBinaryOperator(
      TokenType.BangEqal,
      BoundBinaryOperatorKind.NotEquals,
      VariableType.Number,
      VariableType.Number,
      VariableType.Boolean,
    ),

    new BoundBinaryOperator(
      TokenType.Less,
      BoundBinaryOperatorKind.LessThan,
      VariableType.Number,
      VariableType.Number,
      VariableType.Boolean,
    ),
    new BoundBinaryOperator(
      TokenType.LessEqal,
      BoundBinaryOperatorKind.LessThanOrEqualsTo,
      VariableType.Number,
      VariableType.Number,
      VariableType.Boolean,
    ),
    new BoundBinaryOperator(
      TokenType.Greater,
      BoundBinaryOperatorKind.GreaterThan,
      VariableType.Number,
      VariableType.Number,
      VariableType.Boolean,
    ),
    new BoundBinaryOperator(
      TokenType.GreaterEqal,
      BoundBinaryOperatorKind.GreaterThanOrEqualsTo,
      VariableType.Number,
      VariableType.Number,
      VariableType.Boolean,
    ),

    new BoundBinaryOperator(
      TokenType.AndAnd,
      BoundBinaryOperatorKind.LogicalAnd,
      VariableType.Boolean,
      VariableType.Boolean,
      VariableType.Boolean,
    ),
    new BoundBinaryOperator(
      TokenType.PipePipe,
      BoundBinaryOperatorKind.LogicalOr,
      VariableType.Boolean,
      VariableType.Boolean,
      VariableType.Boolean,
    ),
    new BoundBinaryOperator(
      TokenType.EqualEqual,
      BoundBinaryOperatorKind.Equals,
      VariableType.Boolean,
      VariableType.Boolean,
      VariableType.Boolean,
    ),
    new BoundBinaryOperator(
      TokenType.BangEqal,
      BoundBinaryOperatorKind.NotEquals,
      VariableType.Boolean,
      VariableType.Boolean,
      VariableType.Boolean,
    ),

    new BoundBinaryOperator(
      TokenType.Plus,
      BoundBinaryOperatorKind.Concatination,
      VariableType.String,
      VariableType.String,
      VariableType.String,
    ),
  ];
}

export enum BoundUnaryOperatorKind {
  Identity,
  Negation,
  LogicalNegation,
}

export class BoundUnaryOperator {
  readonly operatorTokenType: TokenType;
  readonly kind: BoundUnaryOperatorKind;
  readonly operandType: VariableType;
  readonly resultType: VariableType;

  private constructor(
    operatorTokenType: TokenType,
    kind: BoundUnaryOperatorKind,
    operandType: VariableType,
    resultType: VariableType,
  ) {
    this.operatorTokenType = operatorTokenType;
    this.kind = kind;
    this.operandType = operandType;
    this.resultType = resultType;
  }

  static tryBind(
    operatorTokenType: TokenType,
    operandType: VariableType,
  ): BoundUnaryOperator | null {
    for (let i = 0; i < this.operators.length; i++) {
      const op = this.operators[i];
      if (
        op.operatorTokenType == operatorTokenType &&
        op.operandType == operandType
      )
        return op;
    }
    return null;
  }

  private static readonly operators: BoundUnaryOperator[] = [
    new BoundUnaryOperator(
      TokenType.Plus,
      BoundUnaryOperatorKind.Identity,
      VariableType.Number,
      VariableType.Number,
    ),
    new BoundUnaryOperator(
      TokenType.Minus,
      BoundUnaryOperatorKind.Negation,
      VariableType.Number,
      VariableType.Number,
    ),
    new BoundUnaryOperator(
      TokenType.Bang,
      BoundUnaryOperatorKind.LogicalNegation,
      VariableType.Boolean,
      VariableType.Boolean,
    ),
  ];
}
