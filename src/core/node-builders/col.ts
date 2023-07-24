import { ReceiptAST } from '../types';

export interface ColNodeProps {
  cols: number;
  justify: 'left' | 'center' | 'right';
}

function ColNodeBuilder(props: ColNodeProps, children?: ReceiptAST[]) {
  return <const>{
    name: 'col',
    props,
    children,
  };
}

export default ColNodeBuilder;
