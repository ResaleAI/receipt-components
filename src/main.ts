import { ReceiptAST } from './core/types';
import { ReceiptComponent, registerRendererPlugin } from './receiptComponent';
import renderEscPos from './renderer/renderers/escpos';
import { registerEscPosRenderer } from './renderer/renderers/escpos';
import { serializeObject } from './util';

// register default escpos renderer
registerRendererPlugin({
  name: 'escpos',
  renderer: renderEscPos,
  registerRenderFunc: registerEscPosRenderer,
});

// export { serializeObject };

export default ReceiptComponent;
