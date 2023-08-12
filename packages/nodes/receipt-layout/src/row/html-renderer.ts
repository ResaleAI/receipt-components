import { RowNodeProps } from './types';

async function renderRow(props: RowNodeProps, children?: string[]) {
  return `
    <div class="row">
    ${children?.join('')}
    </div>
`;
}

export default renderRow;
