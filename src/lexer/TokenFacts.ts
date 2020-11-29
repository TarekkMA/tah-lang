import { TokenType } from './token';

export class TokenFacts {
  /**
   * @returns the oprator precedence value, and null if the token don't have a value
   */
  static getUnaryOperatorPrecedence(type: TokenType): number | null {
    switch (type) {
      case TokenType.Plus:
      case TokenType.Minus:
      case TokenType.Bang:
        return 6;
      default:
        return null;
    }
  }

  static getBinaryOperatorPrecedence(type: TokenType): number | null {
    switch (type) {
      case TokenType.Star:
      case TokenType.Slash:
        return 5;
      case TokenType.Plus:
      case TokenType.Minus:
        return 4;
      case TokenType.BangEqal:
      case TokenType.EqualEqual:
      case TokenType.Less:
      case TokenType.LessEqal:
      case TokenType.Greater:
      case TokenType.GreaterEqal:
        return 3;
      case TokenType.AndAnd:
        return 2;
      case TokenType.PipePipe:
        return 1;
      default:
        return null;
    }
  }

  static getTypeName(type: TokenType): string {
    return TokenType[type];
  }

  static getTypesKeywords(): TokenType[] {
    return [
      TokenType.StringKeyword,
      TokenType.NumberKeyword,
      TokenType.BooleanKeyword,
    ];
  }

  static getUnaryOpertors(): TokenType[] {
    return [TokenType.Plus, TokenType.Minus, TokenType.Bang];
  }

  static getBinaryOpertors(): TokenType[] {
    return [
      TokenType.Star,
      TokenType.Slash,
      TokenType.Plus,
      TokenType.Minus,
      TokenType.BangEqal,
      TokenType.EqualEqual,
      TokenType.Less,
      TokenType.LessEqal,
      TokenType.Greater,
      TokenType.GreaterEqal,
      TokenType.AndAnd,
      TokenType.PipePipe,
    ];
  }

  static getAllOpertors(): TokenType[] {
    return this.getBinaryOpertors().concat(this.getUnaryOpertors());
  }
}
