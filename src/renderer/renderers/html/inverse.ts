async function renderInverse(_props: null, children?: string[]) {
  return `<span style="background-color: black; color: white;">${children?.join(
    ''
  )}</span>`;
}

export default renderInverse;
