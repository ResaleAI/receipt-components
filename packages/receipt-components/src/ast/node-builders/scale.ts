import { ReceiptAST } from '@ast/types';

export interface ScaleNodeProps {
  width?: number;
  height?: number;
}

function buildScaleNode(props: ScaleNodeProps, children?: ReceiptAST[]) {
  return <const>{
    name: 'scale',
    props,
    children,
  };
}

export default buildScaleNode;
