import { ReceiptAST } from '@/types';

function buildFragmentNode(props: null, children?: ReceiptAST[]) {
  return <const>{
    name: 'fragment',
    props,
    children,
  };
}

export default buildFragmentNode;
