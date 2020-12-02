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
import { EvaluatorConsole } from '../src/evaluator/EvaluatorConsole';

$('#ast')
  .on('hover_node.jstree', (_, node) => {
    highlightAstSpan(node);
  })
  .on('dehover_node.jstree', (_, node) => {
    highlightAstSpan(node, true);
  })
  .jstree({
    core: {
      data: [],
    },
  });

Split(['#top-panel', '#bottom-panel'], {
  direction: 'vertical',
  sizes: [75, 25],
});

Split(['#vseditor', '#ast_cont'], {
  direction: 'horizontal',
  sizes: [75, 25],
});

const runButton = document.getElementById('run-btn')!;

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

const output = document.getElementById('output')! as HTMLTextAreaElement;

output.onkeypress = function (e) {
  console.log(e);
};

editor.on('change', () => {
  if (errorMarks.length != 0) {
    errorMarks.forEach((m) => m.clear());
    errorMarks.length = 0;
  }
});

const evalConsole: EvaluatorConsole = {
  print: function (message) {
    console.log(message);
    output.value += message;
  },
  input: async function (message): Promise<string> {
    const value = prompt(message);
    return value || '';
  },
};

runButton.onclick = async function () {
  const codeString = editor.getValue();
  const variables = new Map();
  const syntaxTree = SyntaxTree.parse(codeString);
  showAst(syntaxTree);
  const compilation = new Compilation(syntaxTree);
  output.value = 'Output:\n';
  const result = await compilation.evaluate(evalConsole, variables);
  if (result.diagnostics.length > 0) {
    output.value += 'Failed to run:\n';
    const reports = result.diagnostics.reports;
    output.value += reports.map((r) => r.message).join('\n');
    reports.forEach((d) => {
      const { from, to } = textSpanToStartLEndL(d.span, codeString);
      const mark = editor.markText(from, to, { className: 'cm-red_wavy_line' });
      errorMarks.push(mark);
    });
  } else {
    output.value += `last eval> ${result.value}\n`;
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
  $('#ast').jstree(true).settings!.core.data = [
    astNodeToJsTreeData(syntaxTree),
  ];
  $('#ast').jstree(true).refresh();
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
            text: `end: ${span.end}`,
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
      //textSpanToJsTreeData(node.textSpan!),
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
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
