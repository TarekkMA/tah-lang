import { TypeSymbol } from '../symbols/TypeSymbol';

export class Conversion {
  static none = new Conversion(false, false, false);
  static identity = new Conversion(true, true, true);
  static implicit = new Conversion(true, false, true);
  static explicit = new Conversion(true, false, false);

  private constructor(
    readonly exists: boolean,
    readonly isIdentity: boolean,
    readonly isImplicit: boolean,
  ) {}

  static classify(from: TypeSymbol, to: TypeSymbol): Conversion {
    if (from == to) return this.identity;
    if (from == TypeSymbol.Boolean || from == TypeSymbol.Number) {
      if (to == TypeSymbol.String) {
        return this.explicit;
      }
    }
    if (from == TypeSymbol.String) {
      if (to == TypeSymbol.Boolean || to == TypeSymbol.Number) {
        return this.explicit;
      }
    }
    return this.none;
  }
}
