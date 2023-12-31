import { ReceiptComponent } from './receipt-component';
export * from './plugins';
export * from './rc-functional';
export * from './receipt-component';
export * from './renderer';
export * from './ast'
import escPosRendererPlugin from './renderers/escpos';

declare global {
  namespace RC {
    interface RendererMap {
      escpos: Uint8Array;
    }

    interface ReceiptNodeContext {
      textMode: number;
      scaleBits: number;
      currentAlign: 0 | 1 | 2;
      multiLine: boolean;
      defaultLineLength: number;
      altFontLineLength: number;
      currentOffset: number;
      numColsInLine: number;
      textJustify: 'left' | 'center' | 'right';
    }
  }
  interface NodeMap {}
}

// enable escpos renderer by default
ReceiptComponent.use(escPosRendererPlugin);