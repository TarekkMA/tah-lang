import { TextSpan } from '../TextSpan';
import { AstNode } from '../visualization/ast';

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

export class Token implements AstNode {
  public readonly position: number;
  public readonly text?: string;

  constructor(position: number, readonly type: TokenType, text?: string) {
    this.position = position;
    this.text = text;
  }

  readonly name: string = TokenType[this.type];
  get children(): AstNode[] | undefined {
    if (this.text) {
      return [
        {
          name: this.text,
        },
      ];
    }
    return undefined;
  }
  get textSpan(): TextSpan {
    return new TextSpan(this.position, this.text?.length || 0);
  }

  public toString(): string {
    return `[${TokenType[this.type]}]@${this.position} text:'${this.text}`;
  }
}
