import { AlignNodeProps } from '@resaleai/receipt-components';

async function renderAlign(props: AlignNodeProps, children?: string[]) {
  return `<div style="text-align: ${
    props.mode
  }; width: 100%; display: inline-block;">${children?.join('')}</div>`;
}

export default renderAlign;
