import { ReceiptNode } from '@/types';
import { bytes, charToByte, flattenEscPos, renderChildBytes } from '@/util';

interface AlignNodeProps {
  mode: 'left' | 'center' | 'right';
}

const modeMap: Record<AlignNodeProps['mode'], number> = {
  left: 0x00,
  center: 0x01,
  right: 0x02,
};

const AlignNode: ReceiptNode<AlignNodeProps> = {
  buildHtml({ mode }, children) {
    return `<div style="text-align: ${mode};">${children?.join('')}</div>`;
  },
  async buildEscPos({ mode }, children) {
    const modeByte = modeMap[mode];

    const retVal = [
      bytes.ESC,
      charToByte('a'),
      modeByte,
      ...(await renderChildBytes(children)),
    ];

    if (modeByte !== modeMap.left) {
      retVal.push(bytes.ESC, charToByte('a'), modeMap.left);
    }

    return retVal;
  },
};

export default AlignNode;
