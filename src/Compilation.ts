import { Binder } from './binder/Binder';
import { BoundGlobalScope } from './binder/Scopes';
import { Diagnostic, Diagnostics } from './diagnostics/Diagnostic';
import { Evaluator } from './evaluator/Evaluator';
import { EvaluatorConsole } from './evaluator/EvaluatorConsole';
import SyntaxTree from './parser/SyntaxTree';
import { VariableSymbol } from './symbols/VariableSymbol';

export class EvaluationResult {
  constructor(readonly diagnostics: Diagnostics, readonly value: any) {}
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

  async evaluate(
    evalConsole: EvaluatorConsole,
    variables: Map<VariableSymbol, any>,
  ): Promise<EvaluationResult> {
    const diagnostics = this.syntaxTree.diagnostics;
    diagnostics.addDiagnostics(this.globalScope.diagnostics);
    if (diagnostics.length) {
      return new EvaluationResult(diagnostics, null);
    }

    const evaluator = new Evaluator(
      this.globalScope.statement,
      variables,
      evalConsole,
    );
    const value = await evaluator.evaluate();
    return new EvaluationResult(new Diagnostics(), value);
  }
}
