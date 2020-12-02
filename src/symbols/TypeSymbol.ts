import { TokenType } from '../lexer/token';
import { Symbol } from './Symbol';

export class TypeSymbol extends Symbol {
  static readonly Error = new TypeSymbol('?');
  static readonly Number = new TypeSymbol('number');
  static readonly String = new TypeSymbol('string');
  static readonly Boolean = new TypeSymbol('boolean');
  static readonly Void = new TypeSymbol('void');
  static readonly Function = new TypeSymbol('func');

  private constructor(name: string) {
    super(name);
  }
}

export function typeSymbolFromTokenType(type: TokenType): TypeSymbol {
  switch (type) {
    case TokenType.NumberKeyword:
      return TypeSymbol.Number;
    case TokenType.StringKeyword:
      return TypeSymbol.String;
    case TokenType.BooleanKeyword:
      return TypeSymbol.Boolean;
  }
  throw new Error(`Unkown token type ${TokenType[type]}`);
}
