import renderEscPos, { registerEscPosRenderer } from './nodes/renderer';
import { RCPlugin, RCRendererPlugin } from '@/plugin';

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
  }
}

const escPosRendererPlugin: RCRendererPlugin = {
  name: 'escpos',
  renderer: renderEscPos,
  registerRenderFunc: registerEscPosRenderer,
};

const escPosPlugin: RCPlugin = {
  install(rc) {
    rc.registerRenderer(escPosRendererPlugin);
  },
};

export * from './types';
export * from './constants';
export * from './util';
export * from './linked-list';
export { default as LinkedList } from './linked-list';

export default escPosPlugin;
