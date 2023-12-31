import { TextLiteralNodeProps } from '@resaleai/receipt-ast';

async function renderTextLiteral(props: TextLiteralNodeProps) {
  const htmlText = props.text;
  return htmlText;
}

export default renderTextLiteral;
