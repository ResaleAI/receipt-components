import { ReceiptAST } from '@resaleai/receipt-components';
import { RowNodeProps } from './types';

const defaultRowNodeProps = {
  // justify: 'left',
  // gridSpace: 0,
  // colsPerRow: 12,
};

function buildRowNode(props: RowNodeProps, children?: ReceiptAST[]) {
  // props.justify = props.justify || defaultRowNodeProps.justify;
  // props.gridSpace = props.gridSpace || defaultRowNodeProps.gridSpace;
  // props.colsPerRow = props.colsPerRow || defaultRowNodeProps.colsPerRow;

  return <const>{
    name: 'row',
    props,
    children,
  };
}

export default buildRowNode;
