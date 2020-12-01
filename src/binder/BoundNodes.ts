import { VariableSymbol, VariableType } from '../symbols/Variable';
import { BoundBinaryOperator, BoundUnaryOperator } from './BoundOprators';

export abstract class BoundNode {}

export abstract class BoundExpression {
  abstract readonly type: VariableType;
}

export abstract class BoundStatement {}

export abstract class BoundLiteralExpression<T> extends BoundExpression {
  readonly value: T;
  constructor(value: T) {
    super();
    this.value = value;
  }
}

export class BoundStringLiteralExpression extends BoundLiteralExpression<string> {
  readonly type = VariableType.String;
  constructor(value: string) {
    super(value);
  }
}

export class BoundNumberLiteralExpression extends BoundLiteralExpression<number> {
  readonly type = VariableType.Number;
  constructor(value: number) {
    super(value);
  }
}

export class BoundBooleanLiteral extends BoundLiteralExpression<boolean> {
  readonly type = VariableType.Boolean;
  constructor(value: boolean) {
    super(value);
  }
}

export class BoundBinaryExpression extends BoundExpression {
  public get type(): VariableType {
    return this.operator.resultType;
  }

  readonly left: BoundExpression;
  readonly right: BoundExpression;
  readonly operator: BoundBinaryOperator;

  constructor(
    left: BoundExpression,
    oprator: BoundBinaryOperator,
    right: BoundExpression,
  ) {
    super();
    this.left = left;
    this.operator = oprator;
    this.right = right;
  }
}

export class BoundUnaryExpression extends BoundExpression {
  public get type(): VariableType {
    return this.oprator.resultType;
  }
  constructor(
    readonly oprator: BoundUnaryOperator,
    readonly operand: BoundExpression,
  ) {
    super();
  }
}

export class BoundAssignmentExpression extends BoundExpression {
  public get type(): VariableType {
    return this.expression.type;
  }
  readonly variable: VariableSymbol;
  readonly expression: BoundExpression;
  constructor(variable: VariableSymbol, expression: BoundExpression) {
    super();
    this.variable = variable;
    this.expression = expression;
  }
}

export class BoundVariableExpression extends BoundExpression {
  public get type(): VariableType {
    return this.variable.type;
  }
  readonly variable: VariableSymbol;
  constructor(variable: VariableSymbol) {
    super();
    this.variable = variable;
  }
}

export class BoundBlockStatement extends BoundStatement {
  readonly statements: BoundStatement[];

  constructor(statements: BoundStatement[]) {
    super();
    this.statements = statements;
  }
}

export class BoundExpressionStatement extends BoundStatement {
  readonly expression: BoundExpression;

  constructor(expression: BoundExpression) {
    super();
    this.expression = expression;
  }
}

export class BoundVariableDeclarationStatement extends BoundStatement {
  readonly variable: VariableSymbol;
  readonly initializer?: BoundExpression;

  constructor(variable: VariableSymbol, initializer?: BoundExpression) {
    super();
    this.variable = variable;
    this.initializer = initializer;
  }
}

export class BoundIfStatement extends BoundStatement {
  constructor(
    readonly condition: BoundExpression,
    readonly thenStatement: BoundStatement,
    readonly elseStatement?: BoundStatement,
  ) {
    super();
  }
}

export class BoundWhileStatement extends BoundStatement {
  constructor(
    readonly condition: BoundExpression,
    readonly body: BoundStatement,
  ) {
    super();
  }
}
