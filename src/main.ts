import { ReceiptAST } from './core/types';
import { ReceiptComponent, registerRendererPlugin } from './receiptComponent';
import renderEscPos from './renderer/renderers/escpos';
import { registerEscPosRenderer } from './renderer/renderers/escpos';
import renderHtml, { registerHtmlRenderer } from './renderer/renderers/html';
import { serializeObject } from './util';

// register default escpos renderer
registerRendererPlugin({
  name: 'escpos',
  renderer: renderEscPos,
  registerRenderFunc: registerEscPosRenderer,
});

// register html renderer
registerRendererPlugin({
  name: 'html',
  renderer: renderHtml,
  registerRenderFunc: registerHtmlRenderer,
});

// export { serializeObject };

export default ReceiptComponent;
