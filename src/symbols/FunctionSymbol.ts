import { Symbol } from './Symbol';
import { TypeSymbol } from './TypeSymbol';
import { VariableSymbol } from './VariableSymbol';

export class FunctionSymbol extends Symbol {
  constructor(
    readonly name: string,
    readonly parameters: readonly ParameterSymbol[],
    readonly returnType: TypeSymbol,
  ) {
    super(name);
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
  static input = new FunctionSymbol('input', [], TypeSymbol.String);
  static rnd = new FunctionSymbol(
    'rnd',
    [new ParameterSymbol('max', TypeSymbol.Number)],
    TypeSymbol.Number,
  );
}
