import renderHtml, { registerHtmlRenderer } from './renderer';
import { RCRendererPlugin } from '@resaleai/receipt-plugin';

declare global {
  interface RenderPluginMap {
    html: {};
  }
}

const htmlRendererPlugin: RCRendererPlugin = {
  name: 'html',
  renderer: renderHtml,
  registerRenderFunc: registerHtmlRenderer,
};

export default htmlRendererPlugin;
