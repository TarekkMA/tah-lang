import { Token } from '../lexer/token';
import { TextSpan } from '../TextSpan';
import { AstNode } from '../visualization/ast';
import { SeparatedSyntaxNodeList } from './SeparatedSyntaxNodeList';

export abstract class SyntaxNode implements AstNode {
  public abstract readonly textSpan: TextSpan;
  public abstract readonly name: string;
  public abstract readonly children?: AstNode[];
}

export abstract class Expression extends SyntaxNode {}
export class ErrorExpression extends Expression {
  readonly textSpan = this.token.textSpan;
  readonly name = 'ErrorExpression';

  constructor(readonly token: Token) {
    super();
  }

  public get children(): AstNode[] | undefined {
    return [this.token];
  }
}

export abstract class Statement extends SyntaxNode {}

export abstract class LiteralExpression<T> extends Expression {
  public get textSpan(): TextSpan {
    return this.literalToken.textSpan;
  }

  constructor(readonly value: T, readonly literalToken: Token) {
    super();
  }

  public get children(): AstNode[] | undefined {
    return [this.literalToken];
  }
}

export class StringLiteralExpression extends LiteralExpression<string> {
  readonly name = 'StringLiteralExpression';

  constructor(value: string, literalToken: Token) {
    super(value, literalToken);
  }
}

export class NumberLiteralExpression extends LiteralExpression<number> {
  readonly name = 'NumberLiteralExpression';

  constructor(value: number, literalToken: Token) {
    super(value, literalToken);
  }
}

export class BooleanLiteralExpression extends LiteralExpression<boolean> {
  readonly name = 'BooleanLiteralExpression';

  constructor(value: boolean, literalToken: Token) {
    super(value, literalToken);
  }
}

export class BinaryExpression extends Expression {
  readonly name = 'BinaryExpression';

  public get textSpan(): TextSpan {
    return TextSpan.fromStartEnd(
      this.left.textSpan.start,
      this.right.textSpan.end,
    );
  }
  constructor(
    readonly left: Expression,
    readonly oprator: Token,
    readonly right: Expression,
  ) {
    super();
  }

  public get children(): AstNode[] | undefined {
    return [this.left, this.oprator, this.right];
  }
}

export class UnaryExpression extends Expression {
  readonly name = 'UnaryExpression';

  public get textSpan(): TextSpan {
    return TextSpan.fromStartEnd(
      this.operator.textSpan.start,
      this.operand.textSpan.end,
    );
  }

  constructor(readonly operator: Token, readonly operand: Expression) {
    super();
  }
  public get children(): AstNode[] | undefined {
    return [this.operator, this.operand];
  }
}

export class ParenthesizedExpression extends Expression {
  readonly name = 'ParenthesizedExpression';

  public get textSpan(): TextSpan {
    return TextSpan.fromStartEnd(
      this.openParenthesisToken.textSpan.start,
      this.openParenthesisToken.textSpan.end,
    );
  }
  constructor(
    readonly openParenthesisToken: Token,
    readonly expression: Expression,
    readonly closeParenthesisToken: Token,
  ) {
    super();
  }

  public get children(): AstNode[] | undefined {
    return [
      this.openParenthesisToken,
      this.expression,
      this.closeParenthesisToken,
    ];
  }
}

export class AssignmentExpression extends Expression {
  readonly name = 'AssignmentExpression';

  public get textSpan(): TextSpan {
    return TextSpan.fromStartEnd(
      this.identifier.textSpan.start,
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

  public get children(): AstNode[] | undefined {
    return [this.identifier, this.equalsToken, this.expression];
  }
}

export class NameExpression extends Expression {
  readonly name = 'NameExpression';

  public get textSpan(): TextSpan {
    return this.identifier.textSpan;
  }
  constructor(readonly identifier: Token) {
    super();
  }

  public get children(): AstNode[] | undefined {
    return [this.identifier];
  }
}

export class ConversionExpression extends Expression {
  readonly name = 'ConversionExpression';
  constructor(
    readonly typeToken: Token,
    readonly openParenthesis: Token,
    readonly expression: Expression,
    readonly closeParenthesis: Token,
  ) {
    super();
  }

  public get textSpan(): TextSpan {
    return TextSpan.fromStartEnd(
      this.typeToken.textSpan.start,
      this.closeParenthesis.textSpan.end,
    );
  }

  public get children(): AstNode[] | undefined {
    return [
      this.typeToken,
      this.openParenthesis,
      this.expression,
      this.closeParenthesis,
    ];
  }
}

export class CallExpression extends Expression {
  readonly name = 'CallExpression';
  constructor(
    readonly identifier: Token,
    readonly openParenthesis: Token,
    readonly parameters: SeparatedSyntaxNodeList<Expression>,
    readonly closeParenthesis: Token,
  ) {
    super();
  }

  public get textSpan(): TextSpan {
    return TextSpan.fromStartEnd(
      this.identifier.textSpan.start,
      this.closeParenthesis.textSpan.end,
    );
  }

  public get children(): AstNode[] | undefined {
    return [
      this.identifier,
      this.openParenthesis,
      ...this.parameters.separatorsAndNodes,
      this.closeParenthesis,
    ];
  }
}

export class BlockStatement extends Statement {
  readonly name = 'BlockStatement';

  public get textSpan(): TextSpan {
    return TextSpan.fromStartEnd(
      this.openBraceToken.textSpan.start,
      this.closeBraceToken.textSpan.end,
    );
  }
  constructor(
    readonly openBraceToken: Token,
    readonly statements: Statement[],
    readonly closeBraceToken: Token,
  ) {
    super();
  }

  public get children(): AstNode[] | undefined {
    return [this.openBraceToken, ...this.statements, this.closeBraceToken];
  }
}

export class ExpressionStatement extends Statement {
  readonly name = 'ExpressionStatement';

  public get textSpan(): TextSpan {
    return this.expression.textSpan;
  }
  constructor(readonly expression: Expression) {
    super();
  }

  public get children(): AstNode[] | undefined {
    return [this.expression];
  }
}

export class VariableDeclarationStatement extends Statement {
  readonly name = 'VariableDeclarationStatement';

  public get textSpan(): TextSpan {
    const start = this.keywordToken.textSpan.start;
    const end =
      this.initializerPart?.textSpan.end ||
      this.asTypePart?.textSpan.end ||
      this.identifier.textSpan.end;
    return TextSpan.fromStartEnd(start, end);
  }
  constructor(
    readonly keywordToken: Token,
    readonly identifier: Token,
    readonly asTypePart?: VariableDeclarationAsTypePart,
    readonly initializerPart?: VariableDeclarationInitalizerPart,
  ) {
    super();
  }

  public get children(): AstNode[] | undefined {
    return (<AstNode[]>[this.keywordToken, this.identifier]).concat(
      this.asTypePart?.children || [],
      this.initializerPart?.initializer || [],
    );
  }
}

export class VariableDeclarationInitalizerPart extends SyntaxNode {
  readonly name = 'VariableDeclarationInitalizerPart';

  public get textSpan(): TextSpan {
    return TextSpan.fromStartEnd(
      this.equalsToken.textSpan.start,
      this.initializer.textSpan.end,
    );
  }
  constructor(readonly equalsToken: Token, readonly initializer: Expression) {
    super();
  }
  public get children(): AstNode[] | undefined {
    return [this.equalsToken, this.initializer];
  }
}

export class VariableDeclarationAsTypePart extends SyntaxNode {
  readonly name = 'VariableDeclarationAsTypePart';

  public get textSpan(): TextSpan {
    return TextSpan.fromStartEnd(
      this.asKeywordToken.textSpan.start,
      this.typeToken.textSpan.end,
    );
  }
  constructor(readonly asKeywordToken: Token, readonly typeToken: Token) {
    super();
  }

  public get children(): AstNode[] | undefined {
    return [this.asKeywordToken, this.typeToken];
  }
}

export class IfStatement extends Statement {
  readonly name = 'IfStatement';

  public get textSpan(): TextSpan {
    return TextSpan.fromStartEnd(
      this.ifKeyword.textSpan.start,
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

  public get children(): AstNode[] | undefined {
    return [this.ifKeyword, this.condition, this.thenStatement].concat(
      this.elseClause ? this.elseClause : [],
    );
  }
}

export class ElseClause extends SyntaxNode {
  readonly name = 'ElseClause';

  public get textSpan(): TextSpan {
    return TextSpan.fromStartEnd(
      this.elseKeyword.textSpan.start,
      this.elseStatement.textSpan.end,
    );
  }
  constructor(readonly elseKeyword: Token, readonly elseStatement: Statement) {
    super();
  }

  public get children(): AstNode[] | undefined {
    return [this.elseKeyword, this.elseStatement];
  }
}

export class WhileStatement extends Statement {
  readonly name = 'WhileStatement';

  public get textSpan(): TextSpan {
    return TextSpan.fromStartEnd(
      this.whileKeyword.textSpan.start,
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

  public get children(): AstNode[] | undefined {
    return [this.whileKeyword, this.condition, this.body];
  }
}
