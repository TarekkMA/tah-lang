import { Compilation } from './Compilation';
import SyntaxTree from './parser/SyntaxTree';
import { VariableSymbol } from './symbols/VariableSymbol';

const variables = new Map<VariableSymbol, any>();
const syntaxTree = SyntaxTree.parse('1 + 5');
const compilation = new Compilation(syntaxTree);
console.log(compilation.evaluate(variables));
