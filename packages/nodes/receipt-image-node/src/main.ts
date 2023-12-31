import { RCNodePlugin, RCPlugin } from '@resaleai/receipt-components';
import { buildImageNode, escPosRenderer, htmlRenderer } from './image';
import { ImageNodeProps } from './image/types';

declare global {
  namespace RC {
    interface NodeMap {
      image: {
        props: ImageNodeProps;
        builder: typeof buildImageNode;
      }
    }
  }
}

const imageNodePlugin: RCNodePlugin<ImageNodeProps> = {
  name: 'image',
  aliases: ['img'],
  buildNode: buildImageNode,
  renderers: {
    escpos: escPosRenderer,
    html: htmlRenderer,
  },
};

const imagePlugin: RCPlugin = {
  install: (rc) => {
    rc.registerNodes([imageNodePlugin])
  },
};

export default imagePlugin;
