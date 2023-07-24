import { ReceiptAST } from '@/core/types';

function FragmentNodeBuilder(props: null, children?: ReceiptAST[]) {
  return <const>{
    name: 'fragment',
    props,
    children,
  };
}

export default FragmentNodeBuilder;
