import { solidityASTVisitor as visitor } from '../visitor';
import { CharStreams, CommonTokenStream, SolidityLexer, SolidityParser } from '../grammar';

const parse = (input: string) => {
  const lexer = new SolidityLexer(CharStreams.fromString(input));
  const parser = new SolidityParser(new CommonTokenStream(lexer));
  return visitor.visit(parser.pragmaDirective())!.serialize();
};

describe('visitPragmaDirective', () => {
  test('visitPragmaDirective', () => {
    expect(parse(`pragma solidity ^0.8.24;`)).toMatchObject({
      literals: ['solidity', '^0.8.24'],
    });
    expect(parse(`pragma version >=0.8.24;`)).toMatchObject({
      literals: ['version', '>=0.8.24'],
    });
  });
});
