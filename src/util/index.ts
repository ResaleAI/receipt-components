export const parseBraces = (bracefulStr: string, data: any) => {
  const filledContent = bracefulStr.replace(
    /\{\s*(\w+)\s*\}/g,
    (_match, key) => {
      if (!data[key]) {
        return `{ ${key} }`;
      }
      if (typeof data[key] === 'function') {
        return data[key]();
      } else if (typeof data[key] === 'string') {
        return data[key];
      } else if (typeof data[key] === 'object') {
        return JSON.stringify(data[key]);
      }
      return data[key].toString();
    }
  );
  return filledContent;
};

export function serializeObject(obj: any) {
  return JSON.stringify(obj).replace(/"/g, '&quot;');
}
