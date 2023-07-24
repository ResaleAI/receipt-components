import { RowNodeProps } from '@/core/node-builders/row';

async function renderRow(props: RowNodeProps, children?: string[]) {
  return `
    <div class="row">
    ${children?.join('')}
    </div>
`;
}

export default renderRow;
