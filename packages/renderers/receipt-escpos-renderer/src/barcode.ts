import { BarcodeProps } from '@resaleai/receipt-ast';
import { EscPos } from './types';
import LinkedList from './util/linked-list';
import { bytes, charToByte } from './util';

async function renderBarcode({
  height,
  width,
  data,
  standard,
}: BarcodeProps): Promise<EscPos> {
  width = Number(width || 100);
  height = Number(height || 80);
  standard = Number(standard || 4);
  const dataBuff = LinkedList.fromString(data);
  const prependBytes = new LinkedList([
    bytes.GS,
    charToByte('h'),
    height!,
    bytes.GS,
    charToByte('w'),
    width!,
    bytes.GS,
    charToByte('k'),
    standard!,
  ]);

  const b = prependBytes.appendList(dataBuff);
  b.append(bytes.NUL);

  return b;
}

export async function renderBarcodeArr(props: BarcodeProps): Promise<number[]> {
  return [];
}

export default renderBarcode;
