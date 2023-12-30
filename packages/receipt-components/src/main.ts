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

const t4 = (props: null) => rc('align', { mode: 'right'}, [
  rc('scale', { width: 2, height: 2 }, [
    t('Hello World')
  ])
])

const Receipt = rcFromTemplate((props: null) => `
  <align mode="center">
    <TestReceipt />
  </align>`,
  {
    components: {
      TestReceipt
    }
  }
);

const Final = rcFromTemplate((props: null) => `
  <receipt>
    <Receipt />
  </receipt>
`, {
  components: {
    Receipt
  }
});




renderRC(t4, 'escpos', null).then((ep) => {
  console.log(ep);
})


export default ReceiptComponent;
