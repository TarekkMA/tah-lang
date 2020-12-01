import { TokenType } from '../lexer/token';

export enum VariableType {
  Number,
  String,
  Boolean,
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

export class VariableSymbol {
  readonly isReadOnly: boolean;
  readonly name: string;
  readonly type: VariableType;

  constructor(isReadOnly: boolean, name: string, type: VariableType) {
    this.isReadOnly = isReadOnly;
    this.name = name;
    this.type = type;
  }
}
