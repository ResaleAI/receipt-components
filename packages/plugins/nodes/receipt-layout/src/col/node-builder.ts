import { ReceiptAST } from '@resaleai/receipt-components';
import { ColNodeProps } from './types';

const defaultColProps = {
  cols: 1,
  justify: 'left',
};

function buildColNode(props: ColNodeProps, children?: ReceiptAST[]) {
  props.cols = props.cols || defaultColProps.cols;
  props.justify = props.justify || defaultColProps.justify;

  return <const>{
    name: 'col',
    props,
    children,
  };
}

export default buildColNode;
