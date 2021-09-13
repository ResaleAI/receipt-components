import { CascadingBytesBuilder } from '../bytes_builder';
import { ReceiptComponent } from '../types';

export interface FontProps {
  type: 0 | 1 | 2;
}

export const FontComponent: ReceiptComponent = {
  Render(
    builder: CascadingBytesBuilder,
    props: FontProps,
    children?
  ): number[] {
    if (!!children) {
      return builder.ScopedMod(
        CascadingBytesBuilder.bytes.ESC,
        'M',
        props.type,
        children!
      );
    }

    return builder.GlobalMod(CascadingBytesBuilder.bytes.ESC, 'M', props.type);
  },
};

export default FontComponent;
