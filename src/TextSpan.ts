export class TextSpan {
  readonly start: number;
  readonly length: number;
  get end(): number {
    return this.start + this.length;
  }

  constructor(start: number, length: number) {
    this.start = start;
    this.length = length;
  }
}
