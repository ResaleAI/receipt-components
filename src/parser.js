import { parseDocument } from "htmlparser2"
import fs from "fs"

const template = `
<receipt>
  <align mode="center">
    <bold>
      <large>
        <slot name="title" />
      </large>
    </bold>
  </align>
  <break lines="8"/>
  <text scale="8:8">
    <slot name="content" />
  </text>
  <break lines="5" />
  <cut />
</receipt>
`

// parses using an xml parser and then builds relevant nodes
// may not be needed?
export function parseREML(component) {
  // remove extra ws from xml stuff to prevent weirdness
  let xmlStr = component.template.replace(/\s{2,}|\n/g, "")

  // parse the xml doc and find named slot elements, maybe want to change
  const dom = parseDocument(xmlStr, { xmlMode: true })
  return buildNodes(dom.children[0], component)
}

import AlignNode from "./nodes/align.js"
import BoldNode from "./nodes/bold.js"
import BreakNode from "./nodes/break.js";
import CutNode from "./nodes/cut.js";
import ReceiptDocNode from "./nodes/receipt.js";
import SlotNode from "./nodes/slot.js";
import TextNode from "./nodes/text.js";
import LargeNode from "./nodes/large.js";
import SmallNode from "./nodes/small.js";

// builds node from xml element
export function buildNodes(xmlElem, component) {
  switch(xmlElem.type) {
    case "text":
      return xmlElem.data
    case "tag":
    // build children first: -> -> ->
    //                      <- <- <-/
    let children = xmlElem.children.map(child => child in component.components ? buildNodes(child, component.components[child]) : buildNodes(child, component))
    let attrs = xmlElem.attribs

    switch (xmlElem.name) {
      case "align":
        return new AlignNode(children, attrs)
      case "bold":
        return new BoldNode(children)
      case "break":
        return new BreakNode(attrs)
      case "cut":
        return new CutNode(attrs)
      case "document", "receipt":
        return new ReceiptDocNode(children)
      case "slot":
        return new SlotNode(component)
      case "text":
        return new TextNode(children, attrs)
      case "large":
        return new LargeNode(children)
      case "small":
        return new SmallNode(children)
      case "template":
        if (children.length > 1) {
          throw new Error("Template must have one child")
        }
        return children[0]
      default:
        let comp = component.components[xmlElem.name]
        if (comp !== undefined) {
          if (children.length < 1) {
            return comp
          } else if (children.length === 1) {
            // search thru component template for slot 
            console.log(children)
            comp.slotNode.insert(children[0])
            return comp
          } else {
            throw new Error("Slot must have one child")
          }
        }

        throw new Error(`Tag not recognized (${xmlElem.name})`)
    }
  }
}

// REMLParser.prototype.buildBytesBuffer = function (data = null) {
//   // array that can be mutated
//   let byteArr = new Uint8Array(this.nodeTree.renderPrinterBytes(data).map((el) => typeof el === "string" ? el.charCodeAt(0) : el))

//   return byteArr
// }

// REMLParser.prototype.renderHTML = function (data = null) {
//   return this.nodeTree.renderHTML(data)
// }

// let parser = new REMLParser(template)

// let byteBuff = parser.buildBytesBuffer({ title: "Receipt Test", content: "poop" })

// fs.writeFile("/dev/usb/lp0", byteBuff, (err) => {
//   if (err) return console.log(err)
//   return console.log("wrote to file, should be printing")
// })