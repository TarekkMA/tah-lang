/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { Compilation } from '../src/Compilation';
import SyntaxTree from '../src/parser/SyntaxTree';

const runButton = document.getElementById('run-btn')!;
const output = document.getElementById('output')!;

const editor = monaco.editor.create(document.getElementById('vseditor')!, {
  value: 'console.log("Hello, world")',
});

runButton.onclick = function () {
  const codeString = editor.getValue();
  console.log(codeString, 'nov');
  const variables = new Map();
  const syntaxTree = SyntaxTree.parse(codeString);
  const compilation = new Compilation(syntaxTree);
  const result = compilation.evaluate(variables);
  if (result.diagnostics.length > 0) {
    output.innerHTML = result.diagnostics.join('<br>');
  } else {
    output.innerHTML = result.value;
  }
};
