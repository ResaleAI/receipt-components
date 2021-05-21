export default function (str) {
  const retArr = [];
  for (let i = 0; i < str.length; i++) {
    retArr.push(str.charCodeAt(i));
  }

  return retArr;
}
