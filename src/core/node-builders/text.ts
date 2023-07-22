import { ReceiptAST } from '../types';

export interface TextNodeProps {
  font?: '1' | '2';
  bold?: boolean;
  underline?: boolean;
  reset?: boolean;
}

function TextNodeBuilder(props: TextNodeProps, children?: ReceiptAST[]) {
  return <const>{
    name: 'text',
    props,
    children,
  };
}

export default TextNodeBuilder;
