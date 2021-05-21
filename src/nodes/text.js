import parseBraces from '../util/brace-parser';
import stringToBuffer from '../util/string-to-buffer';

const defaultLineLength = 42;
const altFontLineLength = 56;

// This node is for any text that shows up in the xml

class ReceiptText {
  // constructor w options that modify # of chars in a line
  //  - altFont causes defaultWidth to be 56 (unless otherwise specified)
  //  - widthScale is the horizontal scale of the text, set by the <text-mode> node
  //  - defaultWidth is the char line width when no text effects are applied
  //  - noWordWrap can turn off the word wrapping behavior and just return the text buffer
  constructor(content, mods) {
    // just hold content for now, will be parsed on render
    this.content = content;
    this.mods = mods;

    // set lineLength property to correct width
    // after scale mod
    const [multiLine, lineLength] = parseRelevant(mods);
    this.lineLength = lineLength;
    this.multiLine = multiLine;
  }

  renderHTML(data) {
    return '<span>\n' + super.renderHTML(data) + '\n</span>';
  }

  renderPrinterBytes(data) {
    // use helper to fill content
    const filledContent = parseBraces(this.content, data);

    // if the filled content is shorter than the line length
    // or no word wrap on, just return buffer from
    if (filledContent.length < this.lineLength || !this.multiLine) {
      return stringToBuffer(filledContent);
    }

    // line needs wrapping, have to build RegExp object
    // to use template string with variable width in regex...
    // this regex is pretty weird, but basically:
    //    - first capture group with up to lineLength chars
    //    - second capture group (unused) finds the next space, or
    //    - the third group which doesnt matter either unless this regex is bugged
    // TODO: FIXME
    const varRegex = new RegExp(`(.{1,${this.lineLength}})( +|$\n?)|(.{1,${this.lineLength}})`, 'g');

    // wrap the word
    const wrappedContent = filledContent.replace(varRegex, '$1\n');

    return stringToBuffer(wrappedContent);
  }
}

function parseRelevant({textScaleByte, textModsByte, multiLine}) {
  // first get width scale (scaleByte high)
  const widthScale = (textScaleByte >>> 4) + 1;

  // get alt font from textModByte (first bit)
  const altFont = textModsByte & 1;

  // calc line length
  const lineLength = (altFont ? altFontLineLength : defaultLineLength) / widthScale;

  return [multiLine, lineLength];
}

export default ReceiptText;
