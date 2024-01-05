import escPosPlugin from '@ep';
import { ReceiptComponent } from './receipt-component';

ReceiptComponent.use(escPosPlugin);

export * from '@ast';
export * from '@ep';
export * from '@renderer';
export * from './plugin';
export * from './receipt-component';

export default ReceiptComponent;
