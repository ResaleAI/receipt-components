import { ReceiptNode } from '@/types';
import { bytes, charToByte } from '@/util';

interface BreakNodeProps {
  lines: number;
}

const defaultBreakNodeProps: BreakNodeProps = {
  lines: 1,
};

const BreakNode: ReceiptNode<BreakNodeProps> = {
  buildHtml(_props, _children) {
    return '<br />';
  },
  async buildEscPos({ lines } = defaultBreakNodeProps, _children) {
    if (!lines) {
      return [bytes.LF];
    }
    return [
      bytes.ESC,
      charToByte('d'),
      Number(lines ?? defaultBreakNodeProps.lines),
    ];
  },
};

export default BreakNode;
