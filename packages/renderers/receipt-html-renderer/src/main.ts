import renderHtml, { registerHtmlRenderer } from './renderer';
import { RCPlugin, RCRendererPlugin } from '@resaleai/receipt-components';

declare global {
  namespace RC {
    interface RendererMap {
      html: string;
    }
  }
}

const htmlRendererPlugin: RCRendererPlugin = {
  name: 'html',
  renderer: renderHtml,
  registerRenderFunc: registerHtmlRenderer,
};

const htmlPlugin: RCPlugin = {
  install: (rc) => {
    rc.registerRenderer(htmlRendererPlugin);
  }
}

export default htmlPlugin;
