import { BaseNodeList, formatString } from '../base';
import { AssemblyFlagsContext, SolidityParserVisitor } from '../../antlr4';

export type AssemblyFlags = string[];

export const AssemblyFlags = class extends BaseNodeList<any> {
  type = 'AssemblyFlags' as const;
  constructor(ctx: AssemblyFlagsContext, _visitor: SolidityParserVisitor<any>) {
    super(ctx.AssemblyFlagString(), _visitor, (flag) => formatString(flag.getText()));
  }
};
