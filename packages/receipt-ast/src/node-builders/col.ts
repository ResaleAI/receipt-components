import { ReceiptAST } from '../types';

export interface ColNodeProps {
  cols: number;
  justify: 'left' | 'center' | 'right';
}

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
