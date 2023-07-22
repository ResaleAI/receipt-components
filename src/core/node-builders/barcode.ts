enum Standards {
  None = 0,
  EAN13 = 1,
  EAN8 = 2,
  UPC_A = 3,
  CODE39 = 4,
}

export interface BarcodeProps {
  data: string;
  standard?: Standards;
  height?: number;
}

function BuildBarcode(props: BarcodeProps) {
  return <const>{
    name: 'barcode',
    props,
  };
}

export default BuildBarcode;
