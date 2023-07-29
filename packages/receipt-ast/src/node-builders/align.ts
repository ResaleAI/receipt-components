import { ReceiptAST } from '../types';

export interface AlignNodeProps {
  mode: 'left' | 'center' | 'right';
}

const defaultAlignProps = {
  mode: 'left',
};

function buildAlignNode(props: AlignNodeProps, children?: ReceiptAST[]) {
  props.mode = props.mode || defaultAlignProps.mode;
  return <const>{
    name: 'align',
    props,
    children,
  };
}

export default buildAlignNode;
