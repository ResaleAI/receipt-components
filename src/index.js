import { parseDocument } from "htmlparser2"
import { buildNodes } from "./node_builder.js"
import fs from "fs"

function REMLParser(xmlStr, data = null) {

  // give data prop to store named variables
  // this.data = {};

  // remove extra ws from xml stuff to prevent weirdness
  xmlStr = xmlStr.replace(/(\s{2,})/g, "").replace(/\n/g, "")

  // parse the xml doc and find named slot elements, maybe want to change
  const dom = parseDocument(xmlStr, { xmlMode: true })

  this.nodeTree = buildNodes(dom.children[0])
}

REMLParser.prototype.buildBytesBuffer = function (data = null) {
  // array that can be mutated
  let byteArr = new Uint8Array(this.nodeTree.buildPrinterBytes(data).map((el) => typeof el === "string" ? el.charCodeAt(0) : el))

  return byteArr
}

REMLParser.prototype.buildHTMLPreview = function (data = null) {
  return this.nodeTree.buildHTMLPreview(data)
}

let parser = new REMLParser(`
<receipt>
  <align mode="center">
    <bold>
      <slot name="title" />
    </bold>
  </align>
  <break lines="8"/>
  <align mode="right">
    <text>
      <slot name="content" />
    </text>
  </align>
  <break lines="5" />
  <cut />
</receipt>
`)

let byteBuff = parser.buildBytesBuffer({ title: "Receipt Test", content: "this is some right content. what happens if it goes majorly long like this?" })

fs.writeFile("/dev/usb/lp0", byteBuff, (err) => {
  if (err) return console.log(err)
  return console.log("wrote to file, should be printing")
})

export default REMLParser