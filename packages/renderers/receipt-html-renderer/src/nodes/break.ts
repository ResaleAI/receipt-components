import { BreakNodeProps } from '@resaleai/receipt-components';

async function renderBreak(props: BreakNodeProps) {
  return new Array(props.lines ?? 1).fill('<br />').join('');
}

export default renderBreak;
