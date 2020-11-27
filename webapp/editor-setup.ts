/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { lexerPatterns } from '../src/lexer/lexer';
import { TokenType } from '../src/lexer/token';

/**
 * @returns {void}
 */
export function editorSetup() {
  monaco.languages.setMonarchTokensProvider('tah', {
    tokenizer: {
      root: lexerPatterns.map((pattern) => [
        pattern.pattern,
        pattern.tokenType.toString(),
      ]),
    },
  });

  monaco.editor.defineTheme('tah-theme', {
    base: 'vs',
    inherit: true,
    rules: [
      {
        token: TokenType.VarKeyword.toString(),
        foreground: '#229977',
        fontStyle: 'bold',
      },
    ],
    colors: {},
  });
}
