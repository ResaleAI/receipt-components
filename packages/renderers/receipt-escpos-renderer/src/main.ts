import renderEscPos, { registerEscPosRenderer } from './nodes/renderer';
import { RCRendererPlugin } from '@resaleai/receipt-plugin';

declare global {
  interface RendererMap {
    escpos: Uint8Array;
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
