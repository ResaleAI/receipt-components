import { ReceiptAST } from '@/types';

function buildRootNode(props: null, children?: ReceiptAST[]) {
  return <const>{
    name: 'root',
    props,
    children,
  };
}

export default buildRootNode;
