import AlignNode from "./nodes/align.js"
import BoldNode from "./nodes/bold.js"
import BreakNode from "./nodes/break.js";
import CutNode from "./nodes/cut.js";
import ReceiptDocNode from "./nodes/receipt.js";
import SlotNode from "./nodes/slot.js";
import TextNode from "./nodes/text.js";

// builds node from xml element
export function buildNodes(xmlElem) {
  if (xmlElem.type !== "tag") {
    return null
  }
  let children = xmlElem.children.map(child => buildNodes(child))
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
      return new SlotNode(attrs)
    case "text":
      return new TextNode(children)
  }
}