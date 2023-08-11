import { ReceiptAST } from '../types';

export interface ScaleNodeProps {
  width?: number;
  height?: number;
}

const defaultScaleNodeProps = {
  width: 1,
  height: 1,
};

function buildScaleNode(props: ScaleNodeProps, children?: ReceiptAST[]) {
  props.width = props.width || defaultScaleNodeProps.width;
  props.height = props.height || defaultScaleNodeProps.height;
  return <const>{
    name: 'scale',
    props,
    children,
  };
}

export default buildScaleNode;
