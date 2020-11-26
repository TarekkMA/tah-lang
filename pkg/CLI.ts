import { R_OK } from 'constants';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export class CLI {
  static readline(): Promise<string> {
    return new Promise<string>((resolve) => {
      rl.resume();
      rl.on('line', (input) => {
        rl.pause();
        rl.removeAllListeners();
        resolve(input);
      });
    });
  }
}
