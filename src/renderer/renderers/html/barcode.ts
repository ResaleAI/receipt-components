import { BarcodeProps } from '@/core/node-builders/barcode';

async function renderBarcode(props: BarcodeProps, children?: string[]) {
  return children?.join('') ?? '';
}

export default renderBarcode;
