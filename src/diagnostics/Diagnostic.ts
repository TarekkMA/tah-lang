import { Token, TokenType } from '../lexer/token';
import { TokenFacts } from '../lexer/TokenFacts';
import { TypeSymbol } from '../symbols/TypeSymbol';
import { TextSpan } from '../TextSpan';

export class Diagnostic {
  constructor(readonly span: TextSpan, readonly message: string) {
    this.message = message;
    this.span = span;
  }
}

export class Diagnostics {
  private _reports: Diagnostic[] = [];

  public get reports(): readonly Diagnostic[] {
    return this._reports;
  }

  public get length(): number {
    return this._reports.length;
  }

  public addDiagnostics(other: Diagnostics): Diagnostics {
    this._reports.push(...other._reports);
    return this;
  }

  private report(span: TextSpan, message: string): void {
    const d = new Diagnostic(span, message);
    this._reports.push(d);
  }

  reportBadCharacter(badToken: Token): void {
    this.report(badToken.textSpan, `Bad character input: ${badToken.text}.`);
  }

  reportUnexpectedToken(
    span: TextSpan,
    foundToken: TokenType,
    ...expectedTypes: TokenType[]
  ): void {
    this.report(
      span,
      `Unexpected token <${TokenFacts.getTypeName(
        foundToken,
      )}>, expected ${expectedTypes
        .map((t) => '<' + TokenFacts.getTypeName(t) + '>')
        .join(' or ')}.`,
    );
  }

  reportMustHaveAnInitializerOrType(
    span: TextSpan,
    identifierName: string,
  ): void {
    this.report(
      span,
      `"${identifierName}" must have a type or an initializer.`,
    );
  }

  reportCannotConvert(span: TextSpan, from: TypeSymbol, to: TypeSymbol): void {
    this.report(span, `Cannot convert type '${from.name}' to '${to.name}'.`);
  }

  reportUndefinedFunction(functionIdentifier: Token): void {
    this.report(
      functionIdentifier.textSpan,
      `Function '${functionIdentifier.text}' doesn't exist.`,
    );
  }

  reportWrongArgumentsCount(
    span: TextSpan,
    name: string,
    expectedCount: number,
    actualCount: number,
  ): void {
    this.report(
      span,
      `Function '${name}' requires ${expectedCount} arguments but was given ${actualCount}.`,
    );
  }

  reportWrongArgumentType(
    span: TextSpan,
    name: string,
    expectedType: TypeSymbol,
    actualType: TypeSymbol,
  ): void {
    this.report(
      span,
      `Parameter '${name}' requires a value of type '${expectedType.name}' but was given a value of type '${actualType.name}'.`,
    );
  }

  reportVariableAlreadyDeclared(identifer: Token): void {
    this.report(
      identifer.textSpan,
      `Variable '${identifer.text}' is already declared.`,
    );
  }

  reportUndefinedName(identifier: Token): void {
    this.report(
      identifier.textSpan,
      `Variable '${identifier.text}' doesn't exist.`,
    );
  }

  reportCannotAssignReadonly(span: TextSpan, varName: string): void {
    this.report(
      span,
      `Variable '${varName}' is read-only and cannot be assigned to.`,
    );
  }

  reportUndefinedUnaryOperator(
    span: TextSpan,
    operatorText: string,
    operandType: TypeSymbol,
  ): void {
    this.report(
      span,
      `Unary operator '${operatorText}' is not defined for type '${operandType}'.`,
    );
  }

  reportUndefinedBinaryOperator(
    span: TextSpan,
    operatorText: string,
    leftType: TypeSymbol,
    rightType: TypeSymbol,
  ): void {
    this.report(
      span,
      `Binary operator '${operatorText}' is not defined for types '${leftType}' and '${rightType}'.`,
    );
  }
}
