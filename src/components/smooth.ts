import { CascadingBytesBuilder } from '../bytes_builder';
import { ReceiptComponent } from '../types';

export const SmoothComponent: ReceiptComponent = {
  Render(builder: CascadingBytesBuilder, props: any, children?): number[] {
    if (!!children) {
      return builder.ScopedMod(
        CascadingBytesBuilder.bytes.GS,
        'b',
        1,
        children!
      );
    }

    return builder.GlobalMod(CascadingBytesBuilder.bytes.GS, 'b', 1);
  },
};

export default SmoothComponent;
