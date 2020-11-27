import { Statement } from './Nodes';

export class CompilationUnit {
  readonly statement: Statement;

  constructor(statement: Statement) {
    this.statement = statement;
  }
}
