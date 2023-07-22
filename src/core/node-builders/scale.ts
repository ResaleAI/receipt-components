import { ReceiptAST } from '../types';

export interface ScaleNodeProps {
  width: number;
  height: number;
}

function ScaleNodeBuilder(props: ScaleNodeProps, children?: ReceiptAST[]) {
  return <const>{
    name: 'scale',
    props,
    children,
  };
}

export default ScaleNodeBuilder;
