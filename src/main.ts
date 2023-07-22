import { ReceiptComponent, registerRendererPlugin } from './receiptComponent';
import renderEscPos from './renderer/renderers/escpos';
import { registerEscPosRenderer } from './renderer/renderers/escpos';

// register default escpos renderer
registerRendererPlugin({
  name: 'escpos',
  renderer: renderEscPos,
  registerRenderFunc: registerEscPosRenderer,
});

export default ReceiptComponent;
