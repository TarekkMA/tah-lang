import { TextSpan } from './TextSpan';

export class Diagnostic {
  readonly message: string;
  readonly span: TextSpan;

  constructor(span: TextSpan, message: string) {
    this.message = message;
    this.span = span;
  }

  toString(): string {
    return this.message;
  }
}
