import { BaseNodeString } from '../base';
import { BreakStatementContext, SolidityParserVisitor } from '../../antlr4';

export class BreakStatement extends BaseNodeString {
  type = 'BreakStatement';
  constructor(ctx: BreakStatementContext, visitor: SolidityParserVisitor<any>) {
    super(ctx, visitor);
    this.name = 'break';
  }
}
