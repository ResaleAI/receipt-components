import { CascadingBytesBuilder } from "../bytes_builder";
import { ReceiptComponent } from "../types";

export const BoldComponent: ReceiptComponent = {
  Render(builder: CascadingBytesBuilder, props: any, children): number[] {
    return builder.ScopedMod(CascadingBytesBuilder.bytes.ESC, 'E', 1, children!)
  }
};

export default BoldComponent;