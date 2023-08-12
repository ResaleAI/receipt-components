async function renderRoot(_props: null, children?: string[]) {
  return `<div class="receipt">${children?.join('')}</div>`;
}

export default renderRoot;
