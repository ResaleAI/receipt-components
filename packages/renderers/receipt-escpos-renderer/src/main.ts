import renderEscPos, { registerEscPosRenderer } from './nodes/renderer';
import { RCRendererPlugin } from '@resaleai/receipt-plugin';

declare global {
  interface RenderPluginMap {
    escpos: {};
  }
}

const escPosRendererPlugin: RCRendererPlugin = {
  name: 'escpos',
  renderer: renderEscPos,
  registerRenderFunc: registerEscPosRenderer,
};

export * from './types';

export default escPosRendererPlugin;
