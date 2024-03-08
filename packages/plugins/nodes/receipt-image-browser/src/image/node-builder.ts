import { ImageNodeProps } from './types';

function buildImageNode(props: ImageNodeProps) {
  return <const>{
    name: 'image',
    props,
  };
}

export default buildImageNode;
