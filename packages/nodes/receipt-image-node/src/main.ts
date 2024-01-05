import { RCNodePlugin } from '@resaleai/receipt-components';
import { buildImageNode, escPosRenderer, htmlRenderer } from './image';
import { ImageNodeProps } from './image/types';

declare global {
  interface NodeMap {
    image: {
      props: ImageNodeProps,
      builder: typeof buildImageNode,
    },
  }
}

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
