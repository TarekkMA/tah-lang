export class TextSpan {
  readonly start: number;
  readonly length: number;
  get end(): number {
    return this.start + this.length;
  }

  private constructor(start: number, length: number) {
    this.start = start;
    this.length = length;
  }

  static fromStartLength(start: number, length: number): TextSpan {
    return new TextSpan(start, length);
  }

  static fromStartEnd(start: number, end: number): TextSpan {
    return new TextSpan(start, end - start);
  }
}
