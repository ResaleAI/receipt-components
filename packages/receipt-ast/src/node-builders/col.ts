import { ReceiptAST } from '../types';

export interface ColNodeProps {
  cols: number;
  justify: 'left' | 'center' | 'right';
}

function buildColNode(props: ColNodeProps, children?: ReceiptAST[]) {
  return <const>{
    name: 'col',
    props,
    children,
  };
}

export default buildColNode;
