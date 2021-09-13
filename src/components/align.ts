import { CascadingBytesBuilder } from '../bytes_builder';
import { ReceiptComponent } from '../types';

export enum AlignMode {
  LEFT = 0,
  CENTER,
  RIGHT,
}

export interface AlignProps {
  mode: AlignMode;
}

export const AlignComponent: ReceiptComponent = {
  Render(
    builder: CascadingBytesBuilder,
    props: AlignProps,
    children?
  ): number[] {
    if (!!children) {
      return builder.ScopedMod(
        CascadingBytesBuilder.bytes.ESC,
        'a',
        props.mode,
        children!
      );
    }

    return builder.GlobalMod(CascadingBytesBuilder.bytes.ESC, 'a', props.mode);
  },
};

export default AlignComponent;
