import renderHtml, { registerHtmlRenderer } from './renderer';
import { RCPlugin, RCRendererPlugin } from '@resaleai/receipt-components';

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

const htmlPlugin: RCPlugin = {
  install(rc) {
    rc.registerRenderer(htmlRendererPlugin);
  },
};

export default htmlPlugin;
