export interface ImageNodeProps {
  src: string;
  mode?: 0 | 1 | 32 | 33;
  align?: 'left' | 'center' | 'right';
}

function ImageNodeBuilder(props: ImageNodeProps) {
  return <const>{
    name: 'image',
    props,
  };
}

export default ImageNodeBuilder;
