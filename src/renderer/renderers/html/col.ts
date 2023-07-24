import { ColNodeProps } from '@/core/node-builders/col';

async function renderCol(props: ColNodeProps, children?: string[]) {
  const width = Number(props.cols || 1) * 10;
  return `<div style="flex: 0 0 ${width}%; max-width: ${width}%; text-align: ${
    props.justify
  }">${children?.join('')}</div>`;
}

export default renderCol;
