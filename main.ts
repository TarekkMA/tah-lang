import chalk = require('chalk');
import SyntaxTree from './src/parser/SyntaxTree';
import * as util from 'util';
import { CLI } from './pkg/CLI';
import { Compilation } from './src/Compilation';
import { VariableSymbol } from './src/Variable';

function print(msg: string) {
  process.stdout.write(msg);
}

function println(msg: string) {
  process.stdout.write(msg + '\n');
}

(async function main() {
  try {
    let codeString = '';
    let showAst = false;
    let previous: Compilation | undefined;
    const variables = new Map<VariableSymbol, any>();

    while (true) {
      if (codeString.length == 0) print(chalk.green('» '));
      else print(chalk.green('. '));

      const input = await CLI.readline();
      const isBlank = input == null || input.trim().length == 0;

      if (codeString.length == 0) {
        if (isBlank) {
          continue;
        } else if (input == '#ping') {
          println('pong');
          continue;
        } else if (input == '#cls') {
          console.clear();
          continue;
        } else if (input == '#ast') {
          showAst = !showAst;
          println(chalk.gray(`AST is now${showAst ? '' : ' not'} showing`));
          continue;
        } else if (input == '#exit') {
          println('Goodbay :)');
          break;
        }
      }

      codeString += '\n' + input;

      const syntaxTree = SyntaxTree.parse(codeString);

      if (!isBlank && syntaxTree.diagnostics.length > 0) continue;

      const compilation = previous
        ? previous.continueWith(syntaxTree)
        : new Compilation(syntaxTree);

      if (showAst) {
        console.log(util.inspect(syntaxTree.root, { depth: 20 }));
      }

      const result = compilation.evaluate(variables);

      if (result.diagnostics.length == 0) {
        println(chalk.magenta(result.value));
        previous = compilation;
      } else {
        result.diagnostics.forEach((d) => {
          print(codeString.substr(0, d.span.start));
          print(
            chalk.bgRedBright(
              codeString.substr(d.span.start, d.span.length) || ' ',
            ),
          );
          println(codeString.substr(d.span.end));
          console.error(chalk.red(d.message));
        });
      }
      codeString = '';
    }
  } catch (e) {
    console.log(e);
  }
})();
