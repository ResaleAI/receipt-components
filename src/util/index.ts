export const parseBraces = (bracefulStr: string, data: any) => {
  const filledContent = bracefulStr.replace(
    /\{\s*(\w+)\s*\}/g,
    (_match, key) => {
      if (!data[key]) {
        return `{ ${key} }`;
      }
      return `${data[key]}`;
    }
  );
  return filledContent;
};
