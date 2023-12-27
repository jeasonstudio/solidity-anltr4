import { BaseNodeList } from '../base';
import { VariableDeclarationListContext, SolidityParserVisitor } from '../../antlr4';
import { VariableDeclaration } from './variable-declaration';

export class VariableDeclarationList extends BaseNodeList<VariableDeclaration> {
  type = 'VariableDeclarationList';
  constructor(ctx: VariableDeclarationListContext, visitor: SolidityParserVisitor<any>) {
    super(ctx.variableDeclaration(), visitor);
  }
}
