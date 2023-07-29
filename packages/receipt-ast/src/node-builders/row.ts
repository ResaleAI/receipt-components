import { ReceiptAST } from '../types';

export interface RowNodeProps {
  justify: 'left' | 'center' | 'right' | 'space-between' | 'space-around';
  gridSpace: number;
  colsPerRow: number;
}

const defaultRowNodeProps = {
  justify: 'left',
  gridSpace: 0,
  colsPerRow: 12,
};

function buildRowNode(props: RowNodeProps, children?: ReceiptAST[]) {
  props.justify = props.justify || defaultRowNodeProps.justify;
  props.gridSpace = props.gridSpace || defaultRowNodeProps.gridSpace;
  props.colsPerRow = props.colsPerRow || defaultRowNodeProps.colsPerRow;

  return <const>{
    name: 'row',
    props,
    children,
  };
}

export default buildRowNode;
