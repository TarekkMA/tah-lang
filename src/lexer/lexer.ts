import { Diagnostic, Diagnostics } from '../diagnostics/Diagnostic';
import { Token, TokenType } from './token';

class LexerPattern {
  public readonly pattern: RegExp;
  public readonly tokenType: TokenType;
  constructor(pattern: RegExp, type: TokenType) {
    this.pattern = pattern;
    this.tokenType = type;
  }
}

export const lexerPatterns: LexerPattern[] = [
  new LexerPattern(/^\s+/, TokenType.WhiteSpace),
  new LexerPattern(/^\/\/.*/, TokenType.Comment),
  new LexerPattern(/^\/\*((.|\s)*?)\*\//, TokenType.Comment),
  new LexerPattern(/^[0-9]+(\.[0-9]+){0,1}\b/, TokenType.Number),
  new LexerPattern(/^var\b/, TokenType.VarKeyword),
  new LexerPattern(/^val\b/, TokenType.ValKeyword),
  new LexerPattern(/^as\b/, TokenType.AsKeyword),
  new LexerPattern(/^if\b/, TokenType.IfKeyword),
  new LexerPattern(/^else\b/, TokenType.ElseKeyword),
  new LexerPattern(/^while\b/, TokenType.WhileKeyword),
  new LexerPattern(/^string\b/, TokenType.StringKeyword),
  new LexerPattern(/^number\b/, TokenType.NumberKeyword),
  new LexerPattern(/^boolean\b/, TokenType.BooleanKeyword),
  // new LexerPattern(/^\;/, TokenType.Semicolon),
  new LexerPattern(/^true\b/, TokenType.True),
  new LexerPattern(/^false\b/, TokenType.False),

  new LexerPattern(/^,/, TokenType.Comma),

  new LexerPattern(/^\<\=/, TokenType.LessEqal),
  new LexerPattern(/^\>\=/, TokenType.GreaterEqal),
  new LexerPattern(/^\</, TokenType.Less),
  new LexerPattern(/^\>/, TokenType.Greater),

  new LexerPattern(/^\!\=/, TokenType.BangEqal),
  new LexerPattern(/^\!/, TokenType.Bang),
  new LexerPattern(/^\=\=/, TokenType.EqualEqual),
  new LexerPattern(/^\&\&/, TokenType.AndAnd),
  new LexerPattern(/^\|\|/, TokenType.PipePipe),
  new LexerPattern(/^\=/, TokenType.Equal),
  new LexerPattern(/^\+/, TokenType.Plus),
  new LexerPattern(/^\+/, TokenType.Plus),
  new LexerPattern(/^\-/, TokenType.Minus),
  new LexerPattern(/^\//, TokenType.Slash),
  new LexerPattern(/^\*/, TokenType.Star),
  new LexerPattern(/^\(/, TokenType.OpenParenthesis),
  new LexerPattern(/^\)/, TokenType.CloseParenthesis),
  new LexerPattern(/^\{/, TokenType.OpenBrace),
  new LexerPattern(/^\}/, TokenType.CloseBrace),
  new LexerPattern(/^((\"[^\"]*\")|(\'[^\']*\'))/, TokenType.String),
  new LexerPattern(/^[a-zA-Z_][a-zA-Z_0-9]*/, TokenType.Identifier),
];

export default class Lexer {
  private readonly codeString: string;
  private position = 0;
  public diagnostics = new Diagnostics();

  constructor(codeString: string) {
    this.codeString = codeString;
  }

  private current() {
    if (this.position >= this.codeString.length) return '\0';
    return this.codeString[this.position];
  }

  public lex(): Token {
    if (this.current() == '\0') {
      return new Token(this.codeString.length, TokenType.EndOfFile, '\0');
    }

    const codeStr = this.codeString.substring(this.position);
    for (let i = 0; i < lexerPatterns.length; i++) {
      const pattern = lexerPatterns[i];
      const matches = pattern.pattern.exec(codeStr);
      if (matches != null) {
        const matchedText = matches[0];
        const matchPos = this.position;
        this.position += matchedText.length;
        return new Token(matchPos, pattern.tokenType, matches[0]);
      }
    }

    const badChar = this.current();
    const badPosition = this.position;
    const badToken = new Token(badPosition, TokenType.BadChar, badChar);
    this.diagnostics.reportBadCharacter(badToken);
    this.position++;
    return badToken;
  }
}
