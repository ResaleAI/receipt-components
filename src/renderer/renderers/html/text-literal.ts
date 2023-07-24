import { TextLiteralNodeProps } from '@/core/node-builders/text-literal';

async function renderTextLiteral(props: TextLiteralNodeProps) {
  const htmlText = props.text.replace(/ /g, '&nbsp;');
  return htmlText;
}

export default renderTextLiteral;
