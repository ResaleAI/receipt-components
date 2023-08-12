async function renderFragment(_props: null, children?: string[]) {
  return `<div class="fragment">${children?.join('')}</div>`;
}

export default renderFragment;
