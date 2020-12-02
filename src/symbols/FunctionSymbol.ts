import { Symbol } from './Symbol';
import { TypeSymbol } from './TypeSymbol';
import { VariableSymbol } from './VariableSymbol';

export class FunctionSymbol extends VariableSymbol {
  constructor(
    readonly name: string,
    readonly parameters: readonly ParameterSymbol[],
    readonly returnType: TypeSymbol,
  ) {
    super(false, name, TypeSymbol.Function);
  }
}

export class ParameterSymbol extends VariableSymbol {
  constructor(readonly name: string, readonly type: TypeSymbol) {
    super(true, name, type);
  }
}

export class BuiltinFunctions {
  static print = new FunctionSymbol(
    'print',
    [new ParameterSymbol('message', TypeSymbol.String)],
    TypeSymbol.Void,
  );
  static println = new FunctionSymbol(
    'println',
    [new ParameterSymbol('message', TypeSymbol.String)],
    TypeSymbol.Void,
  );
  static input = new FunctionSymbol('input', [], TypeSymbol.String);
  static rnd = new FunctionSymbol(
    'rnd',
    [new ParameterSymbol('max', TypeSymbol.Number)],
    TypeSymbol.Number,
  );

  static getAll(): readonly FunctionSymbol[] {
    return [this.print, this.println, this.input, this.rnd];
  }
}
