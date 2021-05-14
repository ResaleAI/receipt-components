import BaseNode from "./base.js"

const TextNode = function (content) {
  BaseNode.apply(this, [content, []])
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
    console.log(data, varName)
    return `${data[varName]}` 
  })

  return filledContent.split("")
}

export default TextNode