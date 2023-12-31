import { ReceiptAST } from '@ast/types';

function buildSmoothNode(props: null, children?: ReceiptAST[]) {
  return <const>{
    name: 'smooth',
    props,
    children,
  };
}

export default buildSmoothNode;
