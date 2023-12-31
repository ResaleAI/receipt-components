import { ReceiptComponent } from './receipt-component';
export * from './plugins';
export * from './rc-functional';
export * from './renderer';
export * from './ast'
import escPosRendererPlugin from './renderers/escpos';

declare global {
  namespace RC {
    interface RendererMap {}
    interface ReceiptNodeContext {}
    interface NodeMap {}
  }
}

// enable escpos renderer by default
ReceiptComponent.use(escPosRendererPlugin);