import { throws } from 'assert';
import { stat } from 'fs';
import { off } from 'process';
import { Diagnostic } from '../Diagnostic';
import Lexer from '../lexer/lexer';
import { Token, TokenType } from '../lexer/token';
import { TokenFacts } from '../lexer/TokenFacts';
import { CompilationUnit } from './CompilationUnit';
import {
  AssignmentExpression,
  BinaryExpression,
  BlockStatement,
  BooleanLiteralExpression,
  ElseClause,
  Expression,
  ExpressionStatement,
  ExpressionStub,
  IfStatement,
  NameExpression,
  NumberLiteralExpression,
  ParenthesizedExpression,
  Statement,
  StringLiteralExpression,
  UnaryExpression,
  VariableDeclarationAsTypePart,
  VariableDeclarationInitalizerPart,
  VariableDeclarationStatement,
  WhileStatement,
} from './Nodes';

export default class Parser {
  private tokens: Token[];
  private position = 0;
  public diagnostics: Diagnostic[] = [];

  constructor(codeString: string) {
    const tokens: Token[] = [];
    const lexer = new Lexer(codeString);

    let token: Token;
    do {
      token = lexer.lex();
      if (
        [TokenType.WhiteSpace, TokenType.BadChar, TokenType.Comment].includes(
          token.type,
        ) == false
      ) {
        tokens.push(token);
      }
    } while (token.type != TokenType.EndOfFile);
    this.tokens = tokens;
    this.diagnostics.push(...lexer.diagnostics);
  }

  private peek(offset: number): Token {
    const index = this.position + offset;
    if (index >= this.tokens.length) return this.tokens[this.tokens.length - 1];
    return this.tokens[index];
  }

  private get current(): Token {
    return this.peek(0);
  }

  private nextToken(): Token {
    const token = this.current;
    this.position++;
    return token;
  }

  private matchToken(...types: TokenType[]): Token {
    if (types.includes(this.current.type)) return this.nextToken();
    this.diagnostics.push(
      new Diagnostic(
        this.current.getTextSpan(),
        `Unexpected token <${TokenFacts.getTypeName(
          this.current.type,
        )}>, expected ${types
          .map((t) => '<' + TokenFacts.getTypeName(t) + '>')
          .join(' or ')}.`,
      ),
    );
    return new Token(this.current.position, types[0]);
  }

  public parseCompilationUnit(): CompilationUnit {
    const statement = this.parseStatement();
    this.matchToken(TokenType.EndOfFile);
    return new CompilationUnit(statement);
  }

  private parseStatement(): Statement {
    switch (this.current.type) {
      case TokenType.OpenBrace:
        return this.parseBlockStatement();
      case TokenType.ValKeyword:
      case TokenType.VarKeyword:
        return this.parseVariableDeclarationStatement();
      case TokenType.IfKeyword:
        return this.parseIfStatement();
      case TokenType.WhileKeyword:
        return this.parseWhileStatement();
      default:
        return this.parseExpressionStatement();
    }
  }

  private parseBlockStatement(): BlockStatement {
    const statements = Array<Statement>();
    const openBraceToken = this.matchToken(TokenType.OpenBrace);
    while (
      [TokenType.EndOfFile, TokenType.CloseBrace].includes(this.current.type) ==
      false
    ) {
      const statement = this.parseStatement();
      statements.push(statement);
    }
    const closeBraceToken = this.matchToken(TokenType.CloseBrace);
    return new BlockStatement(openBraceToken, statements, closeBraceToken);
  }

  private parseVariableDeclarationStatement(): VariableDeclarationStatement {
    const keyword = this.matchToken(TokenType.VarKeyword, TokenType.ValKeyword);
    const isReadonly = keyword.type == TokenType.ValKeyword;
    const identifier = this.matchToken(TokenType.Identifier);
    let asTypePart: VariableDeclarationAsTypePart | undefined = undefined;
    let initializerPart:
      | VariableDeclarationInitalizerPart
      | undefined = undefined;
    if (this.current.type == TokenType.AsKeyword) {
      const asKeyword = this.matchToken(TokenType.AsKeyword);
      const typeToken = this.matchToken(...TokenFacts.getTypesKeywords());
      asTypePart = new VariableDeclarationAsTypePart(asKeyword, typeToken);
    }
    if (this.current.type == TokenType.Equal) {
      const equalsToken = this.matchToken(TokenType.Equal);
      const initializerExpression = this.parseExpression();
      initializerPart = new VariableDeclarationInitalizerPart(
        equalsToken,
        initializerExpression,
      );
    }
    if (isReadonly && initializerPart == undefined) {
      this.diagnostics.push(
        new Diagnostic(
          identifier.getTextSpan(),
          `"${identifier.text}" must have an initializer`,
        ),
      );
    }
    if (initializerPart == undefined && asTypePart == undefined) {
      this.diagnostics.push(
        new Diagnostic(
          identifier.getTextSpan(),
          `"${identifier.text}" must have a type or an initializer`,
        ),
      );
    }
    return new VariableDeclarationStatement(
      keyword,
      identifier,
      asTypePart,
      initializerPart,
    );
  }

  private parseIfStatement(): IfStatement {
    const keyword = this.matchToken(TokenType.IfKeyword);
    const condition = this.parseExpression();
    const statement = this.parseStatement();
    const elseClause =
      this.current.type == TokenType.ElseKeyword
        ? this.parseElseClause()
        : undefined;
    return new IfStatement(keyword, condition, statement, elseClause);
  }

  private parseElseClause(): ElseClause {
    const keyword = this.matchToken(TokenType.ElseKeyword);
    const statement = this.parseStatement();
    return new ElseClause(keyword, statement);
  }

  private parseWhileStatement(): WhileStatement {
    const keyword = this.matchToken(TokenType.WhileKeyword);
    const condition = this.parseExpression();
    const body = this.parseStatement();
    return new WhileStatement(keyword, condition, body);
  }

  private parseExpressionStatement(): ExpressionStatement {
    const expression = this.parseExpression();
    return new ExpressionStatement(expression);
  }

  private parseExpression(): Expression {
    return this.parseAssignmentExpression();
  }

  private parseAssignmentExpression(): Expression {
    if (
      this.peek(0).type == TokenType.Identifier &&
      this.peek(1).type == TokenType.Equal
    ) {
      const idToken = this.matchToken(TokenType.Identifier);
      const equalsToken = this.matchToken(TokenType.Equal);
      const right = this.parseAssignmentExpression();
      return new AssignmentExpression(idToken, equalsToken, right);
    }
    return this.parseBinaryExpression();
  }

  private parseBinaryExpression(parentrPrecedence = 0): Expression {
    let left: Expression;
    const unaryPrecedence = TokenFacts.getUnaryOperatorPrecedence(
      this.current.type,
    );
    if (unaryPrecedence != null && unaryPrecedence >= parentrPrecedence) {
      const opratorToken = this.matchToken(...TokenFacts.getUnaryOpertors());
      const operand = this.parseBinaryExpression(unaryPrecedence);
      left = new UnaryExpression(opratorToken, operand);
    } else {
      left = this.parsePrimaryExpression();
    }

    while (true) {
      const binaryPrecedence = TokenFacts.getBinaryOperatorPrecedence(
        this.current.type,
      );
      if (binaryPrecedence == null || binaryPrecedence <= parentrPrecedence)
        break;
      const operatorToken = this.matchToken(...TokenFacts.getBinaryOpertors());
      const right = this.parseBinaryExpression(binaryPrecedence);
      left = new BinaryExpression(left, operatorToken, right);
    }

    return left;
  }

  private parsePrimaryExpression(): Expression {
    switch (this.current.type) {
      case TokenType.OpenParenthesis: {
        const openPren = this.matchToken(TokenType.OpenParenthesis);
        const expression = this.parseExpression();
        const closePren = this.matchToken(TokenType.CloseParenthesis);
        return new ParenthesizedExpression(openPren, expression, closePren);
      }
      case TokenType.True:
      case TokenType.False: {
        const token = this.matchToken(TokenType.True, TokenType.False);
        return new BooleanLiteralExpression(
          token.type == TokenType.True,
          token,
        );
      }
      case TokenType.Identifier: {
        const token = this.matchToken(TokenType.Identifier);
        return new NameExpression(token);
      }
      case TokenType.Number: {
        const numberToken = this.matchToken(TokenType.Number);
        const numberValue = Number(numberToken.text);
        return new NumberLiteralExpression(numberValue, numberToken);
      }
      case TokenType.String: {
        const stringToken = this.matchToken(TokenType.String);
        const stringValue = stringToken.text!.substring(
          1,
          stringToken.text!.length - 1,
        );
        return new StringLiteralExpression(stringValue, stringToken);
      }
      default: {
        this.diagnostics.push(
          new Diagnostic(
            this.current.getTextSpan(),
            `Unexpected token <${TokenFacts.getTypeName(this.current.type)}>.`,
          ),
        );
        return new ExpressionStub();
      }
    }
  }
}
