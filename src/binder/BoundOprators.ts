import { TokenType } from '../lexer/token';
import { TypeSymbol } from '../symbols/TypeSymbol';

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
  Remainder,
}

export class BoundBinaryOperator {
  readonly operatorTokenType: TokenType;
  readonly kind: BoundBinaryOperatorKind;
  readonly leftType: TypeSymbol;
  readonly resultType: TypeSymbol;
  readonly rightType: TypeSymbol;

  private constructor(
    operatorTokenType: TokenType,
    kind: BoundBinaryOperatorKind,
    leftType: TypeSymbol,
    rightType: TypeSymbol,
    resultType: TypeSymbol,
  ) {
    this.operatorTokenType = operatorTokenType;
    this.kind = kind;
    this.leftType = leftType;
    this.rightType = rightType;
    this.resultType = resultType;
  }

  static tryBind(
    operatorTokenType: TokenType,
    leftType: TypeSymbol,
    rightType: TypeSymbol,
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
      TypeSymbol.Number,
      TypeSymbol.Number,
      TypeSymbol.Number,
    ),
    new BoundBinaryOperator(
      TokenType.Minus,
      BoundBinaryOperatorKind.Subtraction,
      TypeSymbol.Number,
      TypeSymbol.Number,
      TypeSymbol.Number,
    ),
    new BoundBinaryOperator(
      TokenType.Star,
      BoundBinaryOperatorKind.Multiplication,
      TypeSymbol.Number,
      TypeSymbol.Number,
      TypeSymbol.Number,
    ),
    new BoundBinaryOperator(
      TokenType.Slash,
      BoundBinaryOperatorKind.Division,
      TypeSymbol.Number,
      TypeSymbol.Number,
      TypeSymbol.Number,
    ),
    new BoundBinaryOperator(
      TokenType.PercentageMark,
      BoundBinaryOperatorKind.Remainder,
      TypeSymbol.Number,
      TypeSymbol.Number,
      TypeSymbol.Number,
    ),

    new BoundBinaryOperator(
      TokenType.EqualEqual,
      BoundBinaryOperatorKind.Equals,
      TypeSymbol.Number,
      TypeSymbol.Number,
      TypeSymbol.Boolean,
    ),
    new BoundBinaryOperator(
      TokenType.BangEqal,
      BoundBinaryOperatorKind.NotEquals,
      TypeSymbol.Number,
      TypeSymbol.Number,
      TypeSymbol.Boolean,
    ),

    new BoundBinaryOperator(
      TokenType.Less,
      BoundBinaryOperatorKind.LessThan,
      TypeSymbol.Number,
      TypeSymbol.Number,
      TypeSymbol.Boolean,
    ),
    new BoundBinaryOperator(
      TokenType.LessEqal,
      BoundBinaryOperatorKind.LessThanOrEqualsTo,
      TypeSymbol.Number,
      TypeSymbol.Number,
      TypeSymbol.Boolean,
    ),
    new BoundBinaryOperator(
      TokenType.Greater,
      BoundBinaryOperatorKind.GreaterThan,
      TypeSymbol.Number,
      TypeSymbol.Number,
      TypeSymbol.Boolean,
    ),
    new BoundBinaryOperator(
      TokenType.GreaterEqal,
      BoundBinaryOperatorKind.GreaterThanOrEqualsTo,
      TypeSymbol.Number,
      TypeSymbol.Number,
      TypeSymbol.Boolean,
    ),

    new BoundBinaryOperator(
      TokenType.AndAnd,
      BoundBinaryOperatorKind.LogicalAnd,
      TypeSymbol.Boolean,
      TypeSymbol.Boolean,
      TypeSymbol.Boolean,
    ),
    new BoundBinaryOperator(
      TokenType.PipePipe,
      BoundBinaryOperatorKind.LogicalOr,
      TypeSymbol.Boolean,
      TypeSymbol.Boolean,
      TypeSymbol.Boolean,
    ),
    new BoundBinaryOperator(
      TokenType.EqualEqual,
      BoundBinaryOperatorKind.Equals,
      TypeSymbol.Boolean,
      TypeSymbol.Boolean,
      TypeSymbol.Boolean,
    ),
    new BoundBinaryOperator(
      TokenType.BangEqal,
      BoundBinaryOperatorKind.NotEquals,
      TypeSymbol.Boolean,
      TypeSymbol.Boolean,
      TypeSymbol.Boolean,
    ),

    new BoundBinaryOperator(
      TokenType.Plus,
      BoundBinaryOperatorKind.Concatination,
      TypeSymbol.String,
      TypeSymbol.String,
      TypeSymbol.String,
    ),
    new BoundBinaryOperator(
      TokenType.EqualEqual,
      BoundBinaryOperatorKind.Equals,
      TypeSymbol.String,
      TypeSymbol.String,
      TypeSymbol.Boolean,
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
  readonly operandType: TypeSymbol;
  readonly resultType: TypeSymbol;

  private constructor(
    operatorTokenType: TokenType,
    kind: BoundUnaryOperatorKind,
    operandType: TypeSymbol,
    resultType: TypeSymbol,
  ) {
    this.operatorTokenType = operatorTokenType;
    this.kind = kind;
    this.operandType = operandType;
    this.resultType = resultType;
  }

  static tryBind(
    operatorTokenType: TokenType,
    operandType: TypeSymbol,
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
      TypeSymbol.Number,
      TypeSymbol.Number,
    ),
    new BoundUnaryOperator(
      TokenType.Minus,
      BoundUnaryOperatorKind.Negation,
      TypeSymbol.Number,
      TypeSymbol.Number,
    ),
    new BoundUnaryOperator(
      TokenType.Bang,
      BoundUnaryOperatorKind.LogicalNegation,
      TypeSymbol.Boolean,
      TypeSymbol.Boolean,
    ),
  ];
}
