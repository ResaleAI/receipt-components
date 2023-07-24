import { ReceiptAST } from '../types';

function InverseNodeBuilder(props: null, children?: ReceiptAST[]) {
  return <const>{
    name: 'inverse',
    props,
    children,
  };
}

export default InverseNodeBuilder;
