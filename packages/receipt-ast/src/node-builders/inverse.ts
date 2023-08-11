import { ReceiptAST } from '@/types';

function buildInverseNode(props: null, children?: ReceiptAST[]) {
  return <const>{
    name: 'inverse',
    props,
    children,
  };
}

export default buildInverseNode;
