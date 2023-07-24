import { TextNodeProps } from '@/core/node-builders/text';

// TODO: will need context for font stuff.
async function renderText(props: TextNodeProps, children?: string[]) {
  const bold = props.bold !== undefined ? true : false;
  const font = props.font !== undefined ? true : false;
  const underline = props.underline !== undefined ? true : false;
  if (props.reset !== undefined) {
    return `<span style="font-weight: normal; font-size: 1rem; font-family: monospace">${children?.join(
      ''
    )}</span>`;
  }
  return `<span style="font-weight: ${
    bold ? (font ? 'bolder' : 'bold') : font ? 'bold' : 'normal'
  }; ${font ? 'font-size: .75rem; font-family: Courier New' : ''}; ${
    underline ? 'text-decoration: underline' : ''
  }">${children?.join('')}</span>`;
}

export default renderText;
