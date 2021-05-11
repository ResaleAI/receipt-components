import htmlparser2 from "htmlparser2"
import { buildNodes } from "./src/node_builder.js"

function REMLParser(xmlStr, data = null) {

  // give data prop to store named variables
  // this.data = {};

  // remove extra ws from xml stuff to prevent weirdness
  xmlStr = xmlStr.replace(/(\s{2,})/g, "").replace("\n", "")

  // parse the xml doc and find named slot elements, maybe want to change
  const dom = htmlparser2.parseDocument(xmlStr, { xmlMode: true })

  this.nodeTree = buildNodes(dom.children[0])
}

REMLParser.prototype.buildBytesBuffer = function (data = null) {

}

REMLParser.prototype.buildHTMLPreview = function (data = null) {
  return this.nodeTree.buildHTMLPreview(data)
}

try {
  let reml = new REMLParser(`
  <document>
    <bold>
      <slot name="test" />
    </bold>
  </document>
  `)
  console.log(reml.buildHTMLPreview({ test: "yo" }))
} catch (e) {
  console.log(e)
}