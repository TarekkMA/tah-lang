import { TokenType } from '../lexer/token';
import { Symbol } from './Symbol';

export enum VariableType {
  Number,
  String,
  Boolean,
}

export class TypeSymbol extends Symbol {
  static readonly Number = new TypeSymbol('number');
  static readonly String = new TypeSymbol('string');
  static readonly Boolean = new TypeSymbol('boolean');

  private constructor(name: string) {
    super(name);
  }
}

export function variableTypeFromTokenType(type: TokenType): VariableType {
  switch (type) {
    case TokenType.NumberKeyword:
      return VariableType.Number;
    case TokenType.StringKeyword:
      return VariableType.String;
    case TokenType.BooleanKeyword:
      return VariableType.Boolean;
  }
  throw new Error(`Unkown token type ${TokenType[type]}`);
}
