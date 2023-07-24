import { ReceiptAST } from '../types';

export interface RowNodeProps {
  justify: 'left' | 'center' | 'right' | 'space-between' | 'space-around';
  gridSpace: number;
}

function RowNodeBuilder(props: RowNodeProps, children?: ReceiptAST[]) {
  return <const>{
    name: 'row',
    props,
    children,
  };
}

export default RowNodeBuilder;
