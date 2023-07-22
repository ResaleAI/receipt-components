import { ReceiptAST } from '../types';

function SmoothNodeBuilder(props: null, children?: ReceiptAST[]) {
  return <const>{
    name: 'smooth',
    props,
    children,
  };
}

export default SmoothNodeBuilder;
