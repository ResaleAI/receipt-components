import { ReceiptNode } from '@/types';
import { assertContext, renderChildBytes } from '@/util';

interface TableItemProps {
  width: number;
}

const TableItemNode: ReceiptNode<TableItemProps> = {
  buildHtml(props, children, context) {
    return '';
  },

  async buildEscPos({ width }, children, parentCtx) {
    const context = assertContext(parentCtx);
    const singleColDefaultLineLength = context.defaultLineLength / 12;
    const singleColAltFontLineLength = context.altFontLineLength / 12;
    const colLineLength = width * singleColDefaultLineLength;
    const colAltFontLineLength = width * singleColAltFontLineLength;

    context.defaultLineLength = colLineLength;
    context.altFontLineLength = colAltFontLineLength;

    return renderChildBytes(children, context);
  },
};
