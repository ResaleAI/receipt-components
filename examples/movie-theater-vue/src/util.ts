export const serializeObject = (obj: any) => {
  return JSON.stringify(obj).replace(/"/g, '&quot;')
}
