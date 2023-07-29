import { ReceiptAST } from '../types';

export interface BreakNodeProps {
  lines: number;
}

const defaultBreakNodeProps: BreakNodeProps = {
  lines: 1,
};

function buildBreakNode(
  props: BreakNodeProps = defaultBreakNodeProps,
  children?: ReceiptAST[]
) {
  props.lines = props.lines || defaultBreakNodeProps.lines;
  return <const>{
    name: 'break',
    props,
    children,
  };
}

export default buildBreakNode;
