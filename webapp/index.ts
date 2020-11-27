/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { Compilation } from '../src/Compilation';
import SyntaxTree from '../src/parser/SyntaxTree';
import { editorSetup } from './editor-setup';

import 'jstree/dist/themes/default/style.min.css';
import 'jstree';
import { AstNode } from '../src/visualization/ast';
import { TextSpan } from '../src/TextSpan';

editorSetup();

const runButton = document.getElementById('run-btn')!;
const output = document.getElementById('output')!;

const editor = monaco.editor.create(document.getElementById('vseditor')!, {
  value: '{\nvar x as number = 55\n\nwhile x < 50\n\tx = x + 8\n\nx\n}',
  language: 'tah',
  theme: 'tah-theme',
});

runButton.onclick = function () {
  const codeString = editor.getValue();
  console.log(codeString, 'nov');
  const variables = new Map();
  const syntaxTree = SyntaxTree.parse(codeString);
  showAst(syntaxTree);
  const compilation = new Compilation(syntaxTree);
  const result = compilation.evaluate(variables);
  if (result.diagnostics.length > 0) {
    output.innerHTML = result.diagnostics.join('<br>');
  } else {
    output.innerHTML = result.value;
  }
};

function showAst(syntaxTree: SyntaxTree) {
  $('#ast').jstree({
    core: {
      data: [astNodeToJsTreeData(syntaxTree)],
    },
  });
}

interface JsTreeData {
  [x: string]: any;
  text: string;
  icon: boolean;
  children?: JsTreeData[];
}

function textSpanToJsTreeData(span: TextSpan): JsTreeData {
  return {
    text: '__loc__',
    icon: false,
    children: span
      ? [
          {
            text: `start: ${span.start}`,
            icon: false,
          },
          {
            text: `start: ${span.end}`,
            icon: false,
          },
          {
            text: `length: ${span.length}`,
            icon: false,
          },
        ]
      : [{ text: 'undfined', icon: false }],
  };
}

function astNodeToJsTreeData(node: AstNode): JsTreeData {
  return {
    text: node.name,
    icon: false,
    children: [
      textSpanToJsTreeData(node.textSpan!),
      ...(astNodesToJsTreeData(node.children) || []),
    ],
  };
}
function astNodesToJsTreeData(
  nodes: AstNode[] | undefined,
): JsTreeData[] | undefined {
  if (nodes == undefined) return undefined;
  return nodes.map(astNodeToJsTreeData);
}
