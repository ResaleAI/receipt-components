import renderHtml, { registerHtmlRenderer } from './renderer';
import { RCRendererPlugin } from '@resaleai/receipt-plugin';

declare global {
  interface RendererMap {
    html: string;
  }
}

const htmlRendererPlugin: RCRendererPlugin = {
  name: 'html',
  renderer: renderHtml,
  registerRenderFunc: registerHtmlRenderer,
};

export default htmlRendererPlugin;
