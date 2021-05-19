const { ReceiptComponent } = require("../component.js")
const { parseBraces } = require("../parser.js")

// This node is for any text that shows up in the xml

class ReceiptText extends ReceiptComponent {

  // constructor w options that modify # of chars in a line
  //  - altFont causes defaultWidth to be 56 (unless otherwise specified)
  //  - widthScale is the horizontal scale of the text, set by the <text-mode> node
  //  - defaultWidth is the char line width when no text effects are applied
  //  - noWordWrap can turn off the word wrapping behavior and just return the text buffer
  constructor(content, { altFont = false, widthScale = 1, defaultWidth = 42, noWordWrap = false }) {
    // init component
    super()
    

    // just hold content for now, will be parsed on render
    this.content = content

    // i stg if there is an edge case where this doesnt work...
    // this sets the defaultWidth to 56 if it has been set to something else
    // and altFont is on
    if (altFont && defaultWidth !== 42)
      defaultWidth = 56

    // set lineLength property to correct width
    // after scale mod
    this.lineLength = defaultWidth / widthScale
    this.noWordWrap = noWordWrap
    
  }

  renderHTML(data) {
    return "<span>\n" + super.renderHTML(data) + "\n</span>"
  }

  renderPrinterBytes(data) {
    // use helper to fill content
    let filledContent = parseBraces(this.content, data)

    // if the filled content is shorter than the line length
    // or no word wrap on, just return buffer from
    if (filledContent.length < this.lineLength || this.noWordWrap) 
      return Buffer.from(this.content)

    // line needs wrapping, have to build RegExp object
    // to use template string with variable width in regex...
    // this regex is pretty weird, but basically:
    //    - first capture group with up to lineLength chars
    //    - second capture group (unused) finds the next space, or
    //    - the third group which doesnt matter either unless this regex is bugged
    // TODO: FIXME
    let varRegex = new RegExp(`(.{1,${this.lineLength}})( +|$\n?)|(.{1,${this.lineLength}})`, "g")

    // wrap the word
    let wrappedContent = filledContent.replace(varRegex, "$1\n")

    return Buffer.from(wrappedContent)
  }
}

module.exports = ReceiptText