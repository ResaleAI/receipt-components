import { ReceiptRenderer, RegisterRendererFunc } from './renderer/types';

/* Optimization */

/* V3 */

export type ReceiptRendererPlugin = {
  name: string;
  renderer: ReceiptRenderer<any>;
  registerRenderFunc: RegisterRendererFunc<any>;
};

export type ReceiptRendererPluginRegistry = {
  [key: string]: ReceiptRenderer<any>;
};

export type RegisterReceiptRendererPluginFunc = (
  name: string,
  renderer: ReceiptRendererPlugin
) => void;

export type ReceiptComponentConfig = {
  renderers: ReceiptRendererPluginRegistry;
};
