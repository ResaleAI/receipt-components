const BaseNode = require("./base.js")

const TextNode = function (content, textWidthScale = 1, small = false) {
  BaseNode.apply(this, [content, []])

  this.width = textWidthScale
  this.small = small ? true : false
}

TextNode.prototype = Object.create(BaseNode.prototype)
TextNode.prototype.constructor = TextNode

TextNode.prototype.renderHTML = function (data) {

  // return html strong w content inside
  return "<span>\n" + BaseNode.prototype.renderHTML.call(this, data) + "\n</span>"
}

TextNode.prototype.renderPrinterBytes = function (data) {

  // use regex to find {{}} and replace with data
  let filledContent = this.content.replace(/{{\s*([\w]+)\s*}}/g, function(_, varName) {
    return `${data[varName]}` 
  })

  console.log(this.content, this.small)

  // change to be parameterized?
  let charCountWidth = Math.floor(this.small ? 56 : 42 / this.width)

  if (filledContent.length > charCountWidth) {
    let varRegex = new RegExp(`(.{1,${charCountWidth}})( +|$\n?)|(.{1,${charCountWidth}})`, "g")
  
    filledContent = filledContent.replace(varRegex, "$1\n")
  }
  // console.log(wrappedContent)

  return filledContent.split("")
}

module.exports = TextNode