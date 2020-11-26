import { Binder } from './binder/Binder';
import { BoundGlobalScope } from './binder/Scopes';
import { Diagnostic } from './Diagnostic';
import { Evaluator } from './evaluator/Evaluator';
import SyntaxTree from './parser/SyntaxTree';
import { VariableSymbol } from './Variable';

export class EvaluationResult {
  constructor(
    readonly diagnostics: readonly Diagnostic[],
    readonly value: any,
  ) {}
}

export class Compilation {
  private _globalScope?: BoundGlobalScope;
  private get globalScope(): BoundGlobalScope {
    if (this._globalScope == undefined) {
      this._globalScope = Binder.bindGlobalScope(
        this.syntaxTree.root,
        this.previous?.globalScope,
      );
    }
    return this._globalScope;
  }

  constructor(
    readonly syntaxTree: SyntaxTree,
    readonly previous?: Compilation,
  ) {}

  continueWith(syntaxTree: SyntaxTree): Compilation {
    return new Compilation(syntaxTree, this);
  }

  evaluate(variables: Map<VariableSymbol, any>): EvaluationResult {
    const diagnostics = this.syntaxTree.diagnostics.concat(
      this.globalScope.diagnostics,
    );
    if (diagnostics.length) {
      return new EvaluationResult(diagnostics, null);
    }

    const evaluator = new Evaluator(this.globalScope.statement, variables);
    const value = evaluator.evaluate();
    return new EvaluationResult([], value);
  }
}
