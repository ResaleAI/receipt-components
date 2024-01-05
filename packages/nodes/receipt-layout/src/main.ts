import { RCNodePlugin, RCPlugin } from '@resaleai/receipt-components';
import { RowNodeProps } from './row/types';
import { ColNodeProps } from './col/types';
import { buildRowNode, rowEscPosRenderer, rowHtmlRenderer } from './row';
import { buildColNode, colEscPosRenderer, colHtmlRenderer } from './col';

const layoutNodePlugin: [RCNodePlugin<RowNodeProps>, RCNodePlugin<ColNodeProps>] = [
  {
    name: 'row',
    buildNode: buildRowNode,
    renderers: {
      escpos: rowEscPosRenderer,
      html: rowHtmlRenderer,
    },
  },
  {
    name: 'col',
    buildNode: buildColNode,
    renderers: {
      escpos: colEscPosRenderer,
      html: colHtmlRenderer,
    },
  },
];

const layoutPlugin: RCPlugin = {
  install(rc) {
    rc.registerNodes(layoutNodePlugin);
  },
}

export default layoutPlugin;
