import { TextLiteralNodeProps } from '@resaleai/receipt-ast';

async function renderTextLiteral(props: TextLiteralNodeProps) {
  const htmlText = props.text.replace(/ /g, '&nbsp;');
  return htmlText;
}

export default renderTextLiteral;
