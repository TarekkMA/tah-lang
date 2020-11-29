import * as CodeMirror from 'codemirror';
import { lexerPatterns } from '../src/lexer/lexer';
import { Token, TokenType } from '../src/lexer/token';
import { TokenFacts } from '../src/lexer/TokenFacts';

export const tahModeName = 'tah';

interface TahModeState {
  isInComment: boolean;
}

export function defineTahMode(): void {
  CodeMirror.defineMode<TahModeState>(tahModeName, () => {
    return {
      name: 'tah',
      startState: () => {
        return {
          isInComment: false,
        };
      },
      token: (stream, state) => {
        if (stream.match(/^\/\*/)) {
          state.isInComment = true;
          return 'comment';
        }

        if (stream.match(/^\*\//)) {
          state.isInComment = false;
          return 'comment';
        }

        if (state.isInComment) {
          stream.next();
          return 'comment';
        }

        for (let i = 0; i < lexerPatterns.length; i++) {
          const pattern = lexerPatterns[i];
          const tokenType = pattern.tokenType;
          const regex = pattern.pattern;
          const tokenTypeName = TokenType[tokenType];

          if (stream.match(regex)) {
            if (TokenFacts.getTypesKeywords().includes(tokenType)) {
              return 'type';
            }
            if (TokenFacts.getAllOpertors().includes(tokenType)) {
              return 'operator';
            }
            if (tokenTypeName.toLocaleLowerCase().includes('keyword')) {
              return 'keyword';
            }
            if (tokenType == TokenType.Comment) {
              return 'comment';
            }
            if (tokenType == TokenType.Identifier) {
              return 'variable';
            }
            if (tokenType == TokenType.String) {
              return 'string';
            }
            if (tokenType == TokenType.Number) {
              return 'number';
            }
            return tokenTypeName;
          }
        }
        //bad character
        stream.next();
        return 'error red_wavy_line';
      },
    };
  });
}
