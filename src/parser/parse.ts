import { SolidityASTBuilder } from '../ast/builder';
import { SyntaxNode } from '../ast';
import { SolidityParser, ParseTree, SolidityLexer, CommonTokenStream, CharStream } from '../antlr4';
import { ParseError, SolidityErrorListener } from './error-listener';

export interface ParseOptions {
  tolerant?: boolean;
  selector?: (parser: SolidityParser) => ParseTree;
}

export const defaultParseOption: ParseOptions = {
  tolerant: false,
  selector: (p) => p.sourceUnit(),
};

export const parse = (source: string, _options?: ParseOptions): SyntaxNode => {
  let syntaxTree: SyntaxNode;
  const options: ParseOptions = Object.assign({}, defaultParseOption, _options);
  const listener = new SolidityErrorListener();

  try {
    const input = new CharStream(source);
    const lexer = new SolidityLexer(input);
    const token = new CommonTokenStream(lexer);
    const parser = new SolidityParser(token);
    parser.removeErrorListeners();
    parser.addErrorListener(listener);

    const visitor = new SolidityASTBuilder();
    const parseTree = options.selector!(parser);
    syntaxTree = parseTree.accept(visitor)! as SyntaxNode;
  } catch (error) {
    if (error instanceof ParseError) {
    } else {
      listener.errors.push(new ParseError((error as any).message || 'unknown error'));
    }
  }

  if (!options.tolerant) listener.throws();
  return syntaxTree!;
};
