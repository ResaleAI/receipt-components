import { ReceiptAST } from '@ast/types';

export interface TextNodeProps {
  font?: 1 | 2;
  bold?: boolean;
  underline?: boolean;
  reset?: boolean;
}

function buildTextNode(props: TextNodeProps, children?: ReceiptAST[]) {
  return <const>{
    name: 'text',
    props,
    children,
  };
}

export default buildTextNode;
