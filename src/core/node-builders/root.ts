import { ReceiptAST } from '../types';

function RootNodeBuilder(props: null, children?: ReceiptAST[]) {
  return <const>{
    name: 'root',
    props,
    children,
  };
}

export default RootNodeBuilder;
