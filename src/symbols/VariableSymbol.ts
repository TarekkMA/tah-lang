import { Symbol } from './Symbol';
import { TypeSymbol } from './TypeSymbol';

export class VariableSymbol extends Symbol {
  constructor(
    readonly isReadOnly: boolean,
    readonly name: string,
    readonly type: TypeSymbol,
  ) {
    super(name);
  }
}
