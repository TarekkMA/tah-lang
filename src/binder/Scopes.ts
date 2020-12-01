import { Diagnostic } from '../Diagnostic';
import { VariableSymbol } from '../symbols/VariableSymbol';
import { BoundStatement } from './BoundNodes';

export class BoundGlobalScope {
  constructor(
    readonly diagnostics: Diagnostic[],
    readonly variables: readonly VariableSymbol[],
    readonly statement: BoundStatement,
    readonly previous?: BoundGlobalScope,
  ) {}
}

export class BoundScope {
  public readonly parent?: BoundScope;
  private variables: Map<string, VariableSymbol> = new Map();

  constructor(parentScope?: BoundScope) {
    this.parent = parentScope;
  }

  tryDeclare(variable: VariableSymbol): boolean {
    if (this.variables.has(variable.name)) return false;
    this.variables.set(variable.name, variable);
    return true;
  }

  tryLookup(name: string): VariableSymbol | null {
    if (this.variables.has(name)) {
      return this.variables.get(name)!;
    }
    if (this.parent == undefined) return null;
    return this.parent.tryLookup(name);
  }

  getDeclaredVariables(): ReadonlyArray<VariableSymbol> {
    return Array.from(this.variables.values());
  }
}
