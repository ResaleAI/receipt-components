import escPosRendererPlugin from '@resaleai/receipt-escpos-renderer';
import { ReceiptComponent } from './receipt-component';
import { FRC, rc, rcFromTemplate, renderRC, t } from './rc-functional';

declare global {
  interface RendererMap {
    escpos: Uint8Array;
  }
}

ReceiptComponent.registerRenderer(escPosRendererPlugin);

const BoldTemplate = rcFromTemplate((props: null) => `
  <text bold>{ children }</text>
`)

function TestReceipt(props: null) {
  return rc('text', { underline: true }, [
    t('Hello World'),
    BoldTemplate(null, [
      t('Hello World')
    ])
  ]);
}

const Receipt = rcFromTemplate((props: null) => `
  <receipt>
    <TestReceipt />
  </receipt>`,
  {
    components: {
      TestReceipt
    }
  }
);


renderRC(Receipt, 'escpos', null).then((ep) => {
  console.log(ep);
})


export default ReceiptComponent;
