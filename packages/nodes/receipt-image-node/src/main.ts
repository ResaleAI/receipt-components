import { RCNodePlugin } from '@resaleai/receipt-plugin';
import { buildImageNode, escPosRenderer, htmlRenderer } from './image';
import { ImageNodeProps } from './image/types';

const imagePlugin: RCNodePlugin<ImageNodeProps> = {
  name: 'image',
  aliases: ['img'],
  buildNode: buildImageNode,
  renderers: {
    escpos: escPosRenderer,
    html: htmlRenderer,
  },
};

export default imagePlugin;
