export interface TextLiteralNodeProps {
  text: string;
}

function buildTextLiteralNode(props: TextLiteralNodeProps) {
  return <const>{
    name: 'textLiteral',
    props,
  };
}

export default buildTextLiteralNode;
