import { BarcodeNodeProps } from '@/ast/index';
import { EscPos } from '@ep/types';
import LinkedList from '@ep/linked-list';
import { charToByte } from '@ep/util';
import { bytes } from '@ep/constants';

async function renderBarcode({
  height,
  width,
  data,
  standard,
}: Required<BarcodeNodeProps>): Promise<EscPos> {
  // Data may be a number, so we need to convert it to a string :(
  data = `${data}`
  const dataBuff = LinkedList.fromString(data);
  const prependBytes = new LinkedList([
    bytes.GS,
    charToByte('h'),
    height,
    bytes.GS,
    charToByte('w'),
    width,
    bytes.GS,
    charToByte('k'),
    standard,
  ]);

  const b = prependBytes.appendList(dataBuff);
  b.append(bytes.NUL);

  return b;
}

export default renderBarcode;
