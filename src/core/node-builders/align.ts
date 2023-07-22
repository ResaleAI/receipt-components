import { ReceiptAST } from '../types';

export interface AlignNodeProps {
  mode: 'left' | 'center' | 'right';
}

function AlignNodeBuilder(props: AlignNodeProps, children?: ReceiptAST[]) {
  return <const>{
    name: 'align',
    props,
    children,
  };
}

export default AlignNodeBuilder;
