import process from 'process';
import { ReceiptAST } from '@resaleai/receipt-components/dist/core/types';
import {
  ReceiptComponent,
  registerRendererPlugin,
} from '@resaleai/receipt-components/dist/receiptComponent';
import { registerEscPosRenderer } from '@resaleai/receipt-components/dist/renderer/renderers/escpos';
import {
  bytes,
  charToByte,
  renderChildBytes,
} from '@resaleai/receipt-components/dist/renderer/renderers/escpos/util';
import {
  ChildBuilder,
  EscPos,
} from '../../dist/renderer/renderers/escpos/types';

const testnode = (props: null, children?: ReceiptAST[]) => {
  return <const>{
    name: 'inverse',
    props,
    children,
  };
};

registerEscPosRenderer(
  'inverse',
  async (_props: null, children: ChildBuilder<EscPos>[]) => {
    return [
      bytes.GS,
      charToByte('B'),
      1,
      ...(await renderChildBytes(children)),
      bytes.GS,
      charToByte('B'),
      0,
    ];
  }
);

const hr = new ReceiptComponent('hr', {
  template: `------------------------------------------`,
});

const TestReceipt = new ReceiptComponent('TestReceipt', {
  template: `
<receipt>
  <align mode="center">
    <scale width="2" height="2">
      Riviera 8
    </scale>
    <br />
    <text font="2">
      510 South Gay Street
      <br />
      Knoxville, TN 37902
      <br />
    </text>
    <inverse>
      SALES RECEIPT
    </inverse>
  </align>
  <br />
  <hr />
  <br />
  <text bold>Item                          Qty   Price </text>
  <br />
  <hr />
  <br />
  test
  <br lines="5" />
</receipt>
    `,
  nodes: {
    inverse: testnode,
  },
  components: [hr],
});

TestReceipt.render({}, [], 'escpos').then((res) => {
  // console.log(res);
  process.stdout.write(Buffer.from(res));
});
