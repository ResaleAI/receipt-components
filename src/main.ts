import { ReceiptComponent } from './receiptComponent';
import { EscPos } from './types';

const SimpleExampleReceipt = new ReceiptComponent({
  template: `
<receipt>
  <text bold><scale width="2">Hello</scale></text>
  <justify align="right">World!</justify>
  <br lines="4" />
</receipt>`,
  skipOptimization: true,
});

SimpleExampleReceipt.render({}, false).then((ep) => {
  if (typeof ep === 'string') {
    console.log(ep);
    return;
  }
  process.stdout.write(new Uint8Array(ep));
  // console.log(ep);
});

export default ReceiptComponent;
