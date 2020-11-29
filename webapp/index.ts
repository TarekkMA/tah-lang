/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Compilation } from '../src/Compilation';
import SyntaxTree from '../src/parser/SyntaxTree';
import * as CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/darcula.css';
import 'jstree/dist/themes/default/style.min.css';
import './code-styles.css';
import 'jstree';
import { AstNode } from '../src/visualization/ast';
import { TextSpan } from '../src/TextSpan';

import { whileExample } from './code-examples';
import { defineTahMode, tahModeName } from './tah-mode';

const runButton = document.getElementById('run-btn')!;
const output = document.getElementById('output')!;

const marks: CodeMirror.TextMarker[] = [];

defineTahMode();

const editor = CodeMirror(document.getElementById('vseditor')!, {
  value: whileExample,
  lineNumbers: true,
  theme: 'darcula',
  mode: tahModeName,
  tabSize: 2,
});

editor.on('change', () => {
  if (marks.length != 0) {
    marks.forEach((m) => m.clear());
    marks.length = 0;
  }
});

runButton.onclick = function () {
  const codeString = editor.getValue();
  const variables = new Map();
  const syntaxTree = SyntaxTree.parse(codeString);
  showAst(syntaxTree);
  const compilation = new Compilation(syntaxTree);
  const result = compilation.evaluate(variables);
  if (result.diagnostics.length > 0) {
    output.innerHTML = result.diagnostics.join('<br>');
    result.diagnostics.forEach((d) => {
      const { from, to } = textSpanToStartLEndL(d.span, codeString);
      console.log(from, to);
      const mark = editor.markText(from, to, { className: 'cm-red_wavy_line' });
      marks.push(mark);
    });
  } else {
    output.innerHTML = result.value;
  }
};

function textSpanToStartLEndL(
  span: TextSpan,
  sourceText: string,
): { from: CodeMirror.Position; to: CodeMirror.Position } {
  console.log(sourceText.substr(span.start, span.length));
  return {
    from: getLineCharFromPos(span.start, sourceText),
    to: getLineCharFromPos(span.end, sourceText),
  };
}

function getLineCharFromPos(
  pos: number,
  sourceText: string,
): CodeMirror.Position {
  let linesIndex = 0;
  let charIndex = 0;

  for (let i = 0; i < pos; i++) {
    const char = sourceText[i];
    if (char == '\n') {
      linesIndex++;
      charIndex = 0;
    } else {
      charIndex++;
    }
  }
  return {
    line: linesIndex,
    ch: charIndex,
  };
}

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
