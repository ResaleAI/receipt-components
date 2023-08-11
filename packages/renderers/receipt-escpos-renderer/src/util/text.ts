/**
 * Converts a `char` to a byte
 * @param char A string with a single character that will be converted to a byte
 * @returns The byte representation of the character
 */
export const charToByte = (char: string): number => {
  if (char.length !== 1) {
    throw new Error('charToByte only accepts a single character');
  }

  const byte = char.charCodeAt(0);
  if (byte > 127) {
    throw new Error('charToByte only accepts ASCII characters');
  }

  return byte;
};

/**
 * Takes some `text` and splits it into lines of `lineLength` length
 * @param text The text to split
 * @param lineLength The length of each line
 * @param offset The offset of the initial line
 * @param justify The justification of each line
 * @returns The text split into lines
 */
export function splitLines(
  text: string,
  lineLength: number,
  offset: number,
  justify: 'left' | 'center' | 'right' = 'left'
) {
  let lines: string[] = [];
  let line = '';
  lineLength = lineLength - offset;
  for (const word of text.split(' ')) {
    if (line.length + word.length > lineLength) {
      lines.push(line);
      line = '';
    }
    line += word + ' ';
  }
  lines.push(line);
  // trying to add spaces
  const res = lines.map((line) => {
    const trimmedLine = line.trimEnd();
    if (justify === 'left') {
      return trimmedLine.padEnd(lineLength, ' ');
    }
    if (justify === 'right') {
      return trimmedLine.padStart(lineLength, ' ');
    }
    if (justify === 'center') {
      const spaceCount = lineLength - trimmedLine.length;
      const leftSpaceCount = Math.floor(spaceCount / 2);
      const rightSpaceCount = spaceCount - leftSpaceCount;
      return trimmedLine
        .padStart(leftSpaceCount + trimmedLine.length, ' ')
        .padEnd(rightSpaceCount + trimmedLine.length, ' ');
    }
  });
  return res;
}
