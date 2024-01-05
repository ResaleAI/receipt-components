import escPosRendererPlugin from '@ep';
import { ReceiptComponent } from './receipt-component';

ReceiptComponent.registerRenderer(escPosRendererPlugin);

export * from './plugin';
export * from '@ep';
export * from '@renderer';
export * from './receipt-component';

export default ReceiptComponent;
