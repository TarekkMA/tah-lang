import { Token } from '../lexer/token';
import { TextSpan } from '../TextSpan';

export abstract class SyntaxNode {
  public abstract readonly textSpan: TextSpan;
}

export abstract class Expression extends SyntaxNode {}
export class ExpressionStub extends Expression {
  readonly textSpan = new TextSpan(0, 0);
}

export abstract class Statement extends SyntaxNode {}

export abstract class LiteralExpression<T> extends Expression {
  public get textSpan() {
    return this.literalToken.getTextSpan();
  }

  constructor(readonly value: T, readonly literalToken: Token) {
    super();
  }
}

export class StringLiteralExpression extends LiteralExpression<string> {
  constructor(value: string, literalToken: Token) {
    super(value, literalToken);
  }
}

export class NumberLiteralExpression extends LiteralExpression<number> {
  constructor(value: number, literalToken: Token) {
    super(value, literalToken);
  }
}

export class BooleanLiteralExpression extends LiteralExpression<boolean> {
  constructor(value: boolean, literalToken: Token) {
    super(value, literalToken);
  }
}

export class BinaryExpression extends Expression {
  public get textSpan() {
    return new TextSpan(this.left.textSpan.start, this.right.textSpan.end);
  }
  constructor(
    readonly left: Expression,
    readonly oprator: Token,
    readonly right: Expression,
  ) {
    super();
  }
}

export class UnaryExpression extends Expression {
  public get textSpan() {
    return new TextSpan(
      this.operator.getTextSpan().start,
      this.operand.textSpan.end,
    );
  }

  constructor(readonly operator: Token, readonly operand: Expression) {
    super();
  }
}

export class ParenthesizedExpression extends Expression {
  public get textSpan() {
    return new TextSpan(
      this.openParenthesisToken.getTextSpan().start,
      this.openParenthesisToken.getTextSpan().end,
    );
  }
  constructor(
    readonly openParenthesisToken: Token,
    readonly expression: Expression,
    readonly closeParenthesisToken: Token,
  ) {
    super();
  }
}

export class AssignmentExpression extends Expression {
  public get textSpan() {
    return new TextSpan(
      this.identifier.getTextSpan().start,
      this.expression.textSpan.end,
    );
  }
  constructor(
    readonly identifier: Token,
    readonly equalsToken: Token,
    readonly expression: Expression,
  ) {
    super();
  }
}

export class NameExpression extends Expression {
  public get textSpan() {
    return this.identifier.getTextSpan();
  }
  constructor(readonly identifier: Token) {
    super();
  }
}

export class BlockStatement extends Statement {
  public get textSpan() {
    return new TextSpan(
      this.openBraceToken.getTextSpan().start,
      this.closeBraceToken.getTextSpan().end,
    );
  }
  constructor(
    readonly openBraceToken: Token,
    readonly statements: Statement[],
    readonly closeBraceToken: Token,
  ) {
    super();
  }
}

export class ExpressionStatement extends Statement {
  public get textSpan() {
    return this.expression.textSpan;
  }
  constructor(readonly expression: Expression) {
    super();
  }
}

export class VariableDeclarationStatement extends Statement {
  public get textSpan() {
    const start = this.keywordToken.getTextSpan().start;
    const end =
      this.initializerPart?.textSpan.end ||
      this.asTypePart?.textSpan.end ||
      this.identifier.getTextSpan().end;
    return new TextSpan(start, end);
  }
  constructor(
    readonly keywordToken: Token,
    readonly identifier: Token,
    readonly asTypePart?: VariableDeclarationAsTypePart,
    readonly initializerPart?: VariableDeclarationInitalizerPart,
  ) {
    super();
  }
}

export class VariableDeclarationInitalizerPart extends SyntaxNode {
  public get textSpan() {
    return new TextSpan(
      this.equalsToken.getTextSpan().start,
      this.initializer.textSpan.end,
    );
  }
  constructor(readonly equalsToken: Token, readonly initializer: Expression) {
    super();
  }
}

export class VariableDeclarationAsTypePart extends SyntaxNode {
  public get textSpan() {
    return new TextSpan(
      this.asKeywordToken.getTextSpan().start,
      this.typeToken.getTextSpan().end,
    );
  }
  constructor(readonly asKeywordToken: Token, readonly typeToken: Token) {
    super();
  }
}

export class IfStatement extends Statement {
  public get textSpan() {
    return new TextSpan(
      this.ifKeyword.getTextSpan().start,
      this.elseClause?.textSpan.end || this.thenStatement.textSpan.end,
    );
  }
  constructor(
    readonly ifKeyword: Token,
    readonly condition: Expression,
    readonly thenStatement: Statement,
    readonly elseClause?: ElseClause,
  ) {
    super();
  }
}

export class ElseClause extends SyntaxNode {
  public get textSpan() {
    return new TextSpan(
      this.elseKeyword.getTextSpan().start,
      this.elseStatement.textSpan.end,
    );
  }
  constructor(readonly elseKeyword: Token, readonly elseStatement: Statement) {
    super();
  }
}

export class WhileStatement extends Statement {
  public get textSpan() {
    return new TextSpan(
      this.whileKeyword.getTextSpan().start,
      this.body.textSpan.end,
    );
  }
  constructor(
    readonly whileKeyword: Token,
    readonly condition: Expression,
    readonly body: Statement,
  ) {
    super();
  }
}
