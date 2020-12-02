import { SyntaxNode } from './Nodes';

export class SeparatedSyntaxNodeList<T extends SyntaxNode> {
  constructor(readonly separatorsAndNodes: readonly SyntaxNode[]) {}

  public get length(): number {
    return (this.separatorsAndNodes.length + 1) / 2;
  }

  public nodeAt(index: number): T {
    return this.separatorsAndNodes[index * 2] as T;
  }

  public separatorAt(index: number): T {
    return this.separatorsAndNodes[index * 2 + 1] as T;
  }
}
