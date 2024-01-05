export interface TextLiteralNodeProps {
  text: string;
}

function buildTextLiteralNode(props: TextLiteralNodeProps) {
  if (!props.text) {
    throw new Error('Text literal must have text');
  }
  return <const>{
    name: 'textLiteral',
    props,
  };
}

export default buildTextLiteralNode;
