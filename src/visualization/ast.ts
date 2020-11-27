import { SyntaxNode } from '../parser/Nodes';
import SyntaxTree from '../parser/SyntaxTree';
import { TextSpan } from '../TextSpan';

export interface AstNode {
  name: string;
  textSpan?: TextSpan;
  children?: AstNode[];
}
