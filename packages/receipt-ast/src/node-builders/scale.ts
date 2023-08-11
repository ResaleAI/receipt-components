import { ReceiptAST } from '@/types';

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
