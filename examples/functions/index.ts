import ReceiptComponent from '@resaleai/receipt-components';
import process from 'process';
import { EscPos } from '../../dist/types';

const SimpleExampleReceipt = new ReceiptComponent({
  template: `
<receipt>
  <align mode="center">
    <text bold>Example Receipt</text>
  </align>
  <br/>
  <align mode="left">
    <text>Hello, world!</text>
  </align>
  <br/>
  <align mode="right">
    <text>Goodbye, world!</text>
  </align>
</receipt>`,
});

SimpleExampleReceipt.render({}).then((ep: EscPos) => {
  console.log(ep);
});

interface Props {
  name: string;
  text: string;
}

// const buffer = new Uint8Array([
//   0x1b, 0x40, 0x41, 0x42, 0x1b, 0x64, 0x07, 0x44, 0x45, 0x46, 0x1b, 0x65, 0x03,
//   0x47, 0x48, 0x49, 0x0a, 0x1d, 0x56, 0x41, 0x03,
// ]);

// process.stdout.write(buffer);

const ReceiptWithProps = new ReceiptComponent<Props>({
  template: `
<receipt>
  <align mode="center">
    <text bold>Hello, {name}!</text>
  </align>
  <br/>
  <align mode="left">
    <text bold>{text}</text>
  </align>
</receipt>`,
});

ReceiptWithProps.render({ name: 'John Doe', text: 'Hello!' }).then(console.log);
