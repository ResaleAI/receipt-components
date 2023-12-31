import { ReceiptAST } from '@ast/types';

export interface AlignNodeProps {
  mode?: 'left' | 'center' | 'right';
}

const defaultAlignProps = <const>{
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
