import { Diagnostic } from '../Diagnostic';
import { TextSpan } from '../TextSpan';
import { AstNode } from '../visualization/ast';
import { CompilationUnit } from './CompilationUnit';
import { SyntaxNode } from './Nodes';
import Parser from './parser';

export default class SyntaxTree implements SyntaxNode {
  readonly name = 'SyntaxTree';
  readonly diagnostics: Diagnostic[];
  readonly root: CompilationUnit;

  constructor(root: CompilationUnit, diagnostics: Diagnostic[]) {
    this.root = root;
    this.diagnostics = diagnostics;
  }

  public get textSpan(): TextSpan {
    return this.root.statement.textSpan;
  }

  public get children(): AstNode[] {
    return [this.root.statement];
  }

  static parse(text: string): SyntaxTree {
    const parser = new Parser(text);
    const compilationUnit = parser.parseCompilationUnit();
    return new SyntaxTree(compilationUnit, parser.diagnostics);
  }
}
