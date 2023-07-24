import { ReceiptAST } from './core/types';
import { ReceiptComponent, registerRendererPlugin } from './receiptComponent';
import renderEscPos from './renderer/renderers/escpos';
import { registerEscPosRenderer } from './renderer/renderers/escpos';
import {
  bytes,
  charToByte,
  renderChildBytes,
} from './renderer/renderers/escpos/util';
import LinkedList from './renderer/renderers/escpos/util/linked-list';

// register default escpos renderer
registerRendererPlugin({
  name: 'escpos',
  renderer: renderEscPos,
  registerRenderFunc: registerEscPosRenderer,
});

const testnode = (props: null, children?: ReceiptAST[]) => {
  return <const>{
    name: 'inverse',
    props,
    children,
  };
};

registerEscPosRenderer('inverse', async (_props, children, ctx) => {
  const prependBytes = new LinkedList([bytes.GS, charToByte('B'), 1]);
  const appendBytes = new LinkedList([bytes.GS, charToByte('B'), 0]);
  const childBytes = await renderChildBytes(children, ctx);

  return prependBytes.appendList(childBytes).appendList(appendBytes);
});

const hr = new ReceiptComponent('hr', {
  template: `------------------------------------------`,
});

const banner = new ReceiptComponent('banner', {
  template: `
  <align mode="center">
    ***************************
    <br />
    Not valid for admission
    <br />
    ***************************
  </align>`,
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
    </text>
    <br />
    <inverse>
      SALES RECEIPT
    </inverse>
    <br />
  </align>
  <hr />
  <br />
  <row>
    <text bold>
      <col cols="7">
        Item
      </col>
      <col cols="1" justify="center">
        Qty
      </col>
      <col cols="2" justify="right">
        Price
      </col>
    </text>
  </row>
  <br />
  <hr />
  <row>
    <col cols="3">
      Unlimited Insidious5
    </col>
    <col cols="1" justify="center">
      1
    </col>
    <col cols="2" justify="right">
      0.00
    </col>
    <col cols="7">
      PC-Small
    </col>
    <col cols="1" justify="center">
      1
    </col>
    <col cols="2" justify="right">
      7.37
    </col>
    <col cols="7">
      FTN - Small Pepsi
    </col>
    <col cols="1" justify="center">
      1
    </col>
    <col cols="2" justify="right">
      5.84
    </col>
    <col cols="8">
    </col>
    <col cols="2" justify="right">
      -------
    </col>
    <col cols="5">
    </col>
    <col cols="3">
      Subtotal:
    </col>
    <col cols="2" justify="right">
      13.21
    </col>
    <col cols="5">
    </col>
    <col cols="3">
      TAX:
    </col>
    <col cols="2" justify="right">
      1.23
    </col>
    <col cols="5">
    </col>
    <col cols="3">
      <scale height="2">
        TOTAL:
      </scale>
    </col>
    <col cols="2" justify="right">
      <scale height="2">
        14.44
      </scale>
    </col>
  </row>
  <br />
  <text bold>
    Payments:
  </text>
  <br />
  <text>   CREDIT Card  14.44</text>
  <br />
  <img maxWidth=".3" src="https://static.vecteezy.com/system/resources/thumbnails/002/258/271/small/template-of-qr-code-ready-to-scan-with-smartphone-illustration-vector.jpg" align="center" />
  <row>
    <col cols="6">
      Trans #: 02472446
    </col>
    <col cols="4">
      7/9/2023 16:23
    </col>
    <col cols="6">
      Cashier: Chris
    </cols>
  </row>
  <banner />
  <br />
  <hr />
  <align mode="center">
    <scale width="2" height="2">
      REGAL CROWN CLUB
    </scale>
    <br />
    Card No.: **********1527
    <br />
    Credits earned:     1444
    <br />
    Credits used:          0
    <br />
    <inverse>
      Credit Balance:     7717
    </inverse>
    <br />
    <scale height="2">
      Register or choose rewards at MyRegal.com
    </scale>
    <br />
  </align>
</receipt>
    `,
  nodes: {
    inverse: testnode,
  },
  components: [hr, banner],
});

TestReceipt.render({}, [], 'escpos').then((res) => {
  // console.log(res);
  process.stdout.write(res);
});

export default ReceiptComponent;
