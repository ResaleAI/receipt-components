import { TextNodeProps } from '@resaleai/receipt-ast';

// TODO: will need context for font stuff.
async function renderText(props: TextNodeProps, children?: string[]) {
  const bold = props.bold !== undefined ? true : false;
  const font = props.font !== undefined ? true : false;
  const underline = props.underline !== undefined ? true : false;
  if (props.reset !== undefined) {
    return `<p style="font-weight: normal; font-size: 1em; font-family: monospace">${children?.join(
      ''
    )}</p>`;
  }

  let styles = '';

  // bolding
  if (bold) {

    // with alt font we are bold by default
    if (font) {
      styles += 'font-weight: bolder; ';
    } else {
      styles += 'font-weight: bold; ';
    }
  } else {
    if (font) {
      styles += 'font-weight: bold; ';
    } else {
      styles += 'font-weight: normal; ';
    }
  }

  // font
  if (font) {
    styles += 'font-size: .75rem; font-family: Courier New; ';
  }

  // underline
  if (underline) {
    styles += 'text-decoration: underline; ';
  }




  return `<p style="${styles.trimEnd()}">${children?.join('')}</p>`;
}

export default renderText;
