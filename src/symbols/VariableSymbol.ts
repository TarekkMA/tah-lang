import { Symbol } from './Symbol';
import { VariableType } from './TypeSymbol';

export class VariableSymbol extends Symbol {
  constructor(
    readonly isReadOnly: boolean,
    readonly name: string,
    readonly type: VariableType,
  ) {
    super(name);
  }
}
