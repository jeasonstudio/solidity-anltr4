import { IndexAccessContext, SolidityParserVisitor } from '../../antlr4';
import { Expression } from './expression';

export class IndexAccess extends Expression {
  type = 'IndexAccess';
  baseExpression: Expression;
  indexExpression: Expression | null = null;
  constructor(ctx: IndexAccessContext, visitor: SolidityParserVisitor<any>) {
    super(ctx, visitor);
    this.baseExpression = ctx.expression(0)!.accept(visitor);
    this.indexExpression = ctx._index?.accept(visitor) ?? null;
  }
}
