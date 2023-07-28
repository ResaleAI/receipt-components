import escPosRendererPlugin from '@resaleai/receipt-escpos-renderer';
import { ReceiptComponent } from './receiptComponent';

declare global {
  interface RenderPluginMap {
    escpos: {};
  }
}

ReceiptComponent.registerRenderer(escPosRendererPlugin);

export default ReceiptComponent;
