import { CascadingBytesBuilder } from '../bytes_builder';
import { ReceiptComponent } from '../types';

interface BreakProps {
  lines?: number;
}

export const BreakComponent: ReceiptComponent = {
  Render(builder: CascadingBytesBuilder, props: BreakProps): number[] {
    if (!props.lines) {
      return builder.RawBytes(CascadingBytesBuilder.bytes.LF);
    }

    return builder.RawBytes(CascadingBytesBuilder.bytes.ESC, 'd', props.lines!);
  },
};

export default BreakComponent;
