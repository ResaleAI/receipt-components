import { CascadingBytesBuilder } from '../bytes_builder';
import { ReceiptComponent } from '../types';

export interface ScaleProps {
  x: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  y: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

export const ScaleComponent: ReceiptComponent = {
  Render(
    builder: CascadingBytesBuilder,
    props: ScaleProps,
    children?
  ): number[] {
    let scaleByte = (props.x << 4) | props.y;

    if (!!children) {
      return builder.ScopedMod(
        CascadingBytesBuilder.bytes.GS,
        '!',
        scaleByte,
        children!
      );
    }

    return builder.GlobalMod(CascadingBytesBuilder.bytes.GS, '!', scaleByte);
  },
};

export default ScaleComponent;
