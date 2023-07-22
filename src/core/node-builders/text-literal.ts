export interface TextLiteralNodeProps {
  text: string;
}

function TextLiteralNodeBuilder(props: TextLiteralNodeProps) {
  return <const>{
    name: 'textLiteral',
    props,
  };
}

export default TextLiteralNodeBuilder;
