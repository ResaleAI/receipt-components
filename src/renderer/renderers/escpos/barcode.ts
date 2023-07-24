import { BarcodeProps } from '@/core/node-builders/barcode';
import { EscPos } from './types';
import LinkedList from './util/linked-list';

async function renderBarcode(props: BarcodeProps): Promise<EscPos> {
  return new LinkedList();
}

export default renderBarcode;
