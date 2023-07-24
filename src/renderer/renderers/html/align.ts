import { AlignNodeProps } from '@/core/node-builders/align';

async function renderAlign(props: AlignNodeProps, children?: string[]) {
  return `<div style="text-align: ${props.mode}">${children?.join('')}</div>`;
}

export default renderAlign;
