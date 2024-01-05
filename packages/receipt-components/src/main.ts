import escPosRendererPlugin from "@resaleai/receipt-escpos-renderer";
import { ReceiptComponent } from "./receipt-component";
import { RendererName } from "@resaleai/receipt-plugin";

declare global {
  interface RendererMap {
    escpos: Uint8Array;
  }
}

ReceiptComponent.registerRenderer(escPosRendererPlugin);

export default ReceiptComponent;
