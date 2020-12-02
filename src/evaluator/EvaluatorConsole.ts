export interface EvaluatorConsole {
  print(text: string): void;
  input(message: string): Promise<string>;
}
