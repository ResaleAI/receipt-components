import { ReceiptAST } from '../types';

export interface BreakNodeProps {
  lines: number;
}

const defaultBreakNodeProps: BreakNodeProps = {
  lines: 1,
};

function BreakNodeBuilder(
  props: BreakNodeProps = defaultBreakNodeProps,
  children?: ReceiptAST[]
) {
  return <const>{
    name: 'break',
    props,
    children,
  };
}

export default BreakNodeBuilder;
