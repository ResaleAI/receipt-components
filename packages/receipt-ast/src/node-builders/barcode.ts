export enum Standards {
  None = 0,
  EAN13 = 1,
  EAN8 = 2,
  UPC_A = 3,
  CODE39 = 4,
}

const defaultBarcodeProps: BarcodeNodeProps = {
  data: '',
  standard: Standards.CODE39,
  height: 80,
  width: 100,
  align: 'center',
};

export interface BarcodeNodeProps {
  data: string;
  standard?: Standards;
  height?: number;
  width?: number;
  align?: 'left' | 'center' | 'right';
}

function buildBarcodeNode(props: BarcodeNodeProps) {
  if (!props.data) throw new Error('Barcode data is required');
  props.standard = props.standard || defaultBarcodeProps.standard;
  props.height = props.height || defaultBarcodeProps.height;
  props.width = props.width || defaultBarcodeProps.width;
  props.align = props.align || defaultBarcodeProps.align;
  return <const>{
    name: 'barcode',
    props,
  };
}

export default buildBarcodeNode;
