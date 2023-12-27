import renderEscPos, { registerEscPosRenderer } from './nodes/renderer';
import { RCRendererPlugin } from '@resaleai/receipt-plugin';

declare global {
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
    horizontalUnits: number;
    verticalUnits: number;
  }
}

const escPosRendererPlugin: RCRendererPlugin = {
  name: 'escpos',
  renderer: renderEscPos,
  registerRenderFunc: registerEscPosRenderer,
};

export * from './types';
export * from './constants';

export default escPosRendererPlugin;
