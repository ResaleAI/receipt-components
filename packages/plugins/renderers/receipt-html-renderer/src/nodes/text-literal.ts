import { TextLiteralNodeProps } from '@resaleai/receipt-components';

async function renderTextLiteral(props: TextLiteralNodeProps) {
  const htmlText = props.text;
  return htmlText;
}

export default renderTextLiteral;
