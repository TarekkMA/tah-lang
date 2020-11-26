import { TextSpan } from '../TextSpan';

export enum TokenType {
  WhiteSpace,
  Comment,

  Number,
  String,

  Plus,
  Minus,
  Star,
  Slash,

  Bang,
  BangEqal,

  False,
  True,

  Equal,

  EqualEqual,
  AndAnd,
  PipePipe,

  OpenParenthesis,
  CloseParenthesis,

  OpenBrace,
  CloseBrace,

  StringKeyword,
  NumberKeyword,
  BooleanKeyword,

  Identifier,

  EndOfFile,
  BadChar,
  AsKeyword,
  VarKeyword,
  ValKeyword,
  Less,
  GreaterEqal,
  LessEqal,
  Greater,
  IfKeyword,
  WhileKeyword,
  ElseKeyword,
}

export class Token {
  public readonly position: number;
  public readonly type: TokenType;
  public readonly text?: string;

  constructor(position: number, type: TokenType, text?: string) {
    this.position = position;
    this.type = type;
    this.text = text;
  }

  getTextSpan(): TextSpan {
    return new TextSpan(this.position, this.text?.length || 0);
  }

  public toString(): string {
    return `[${TokenType[this.type]}]@${this.position} text:'${this.text}`;
  }
}
