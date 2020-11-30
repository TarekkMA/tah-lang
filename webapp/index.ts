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

import Split from 'split.js';

interface Dictionary<T> {
  [Key: string]: T;
}

Split(['#top-panel', '#bottom-panel'], {
  direction: 'vertical',
  sizes: [75, 25],
});

Split(['#vseditor', '#ast_cont'], {
  direction: 'horizontal',
  sizes: [75, 25],
});

const runButton = document.getElementById('run-btn')!;
const output = document.getElementById('output')!;

const errorMarks: CodeMirror.TextMarker[] = [];

const astHighlightMark: Map<string, CodeMirror.TextMarker> = new Map();
const astSpans: Map<string, TextSpan | undefined> = new Map();

defineTahMode();

const editor = CodeMirror(document.getElementById('vseditor')!, {
  value: whileExample,
  lineNumbers: true,
  theme: 'darcula',
  mode: tahModeName,
  tabSize: 2,
  viewportMargin: Infinity,
});

editor.on('change', () => {
  if (errorMarks.length != 0) {
    errorMarks.forEach((m) => m.clear());
    errorMarks.length = 0;
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
      const mark = editor.markText(from, to, { className: 'cm-red_wavy_line' });
      errorMarks.push(mark);
    });
  } else {
    output.innerHTML = result.value;
  }
};

function textSpanToStartLEndL(
  span: TextSpan,
  sourceText: string,
): { from: CodeMirror.Position; to: CodeMirror.Position } {
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
  astSpans.clear();
  astHighlightMark.forEach((value) => value.clear());
  astHighlightMark.clear();
  $('#ast')
    .on('hover_node.jstree', (_, node) => {
      highlightAstSpan(node);
    })
    .on('dehover_node.jstree', (_, node) => {
      highlightAstSpan(node, true);
    })
    .jstree({
      core: {
        data: [astNodeToJsTreeData(syntaxTree)],
      },
    });
}

function highlightAstSpan(
  node: any /*jstree event node type*/,
  remove = false,
) {
  node = node.node;
  const id = node.id;
  const span = astSpans.get(id);
  if (!span) return;
  astHighlightMark.get(id)?.clear();
  if (remove) return;
  const codeString = editor.getValue();
  const { from, to } = textSpanToStartLEndL(span, codeString);
  const mark = editor.markText(from, to, { className: 'ast_highlighted' });
  astHighlightMark.set(id, mark);
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
  const id = uuidv4();
  astSpans.set(id, node.textSpan);
  return {
    text: node.name,
    icon: false,
    id: id,
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

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
