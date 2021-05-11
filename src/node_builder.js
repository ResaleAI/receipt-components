import AlignNode from "./nodes/align.js"
import BoldNode from "./nodes/bold.js"
import BreakNode from "./nodes/break.js";
import CutNode from "./nodes/cut.js";
import DocNode from "./nodes/document.js";
import SlotNode from "./nodes/slot.js";

// builds node from xml element
export function buildNodes(xmlElem) {
  let children = xmlElem.children.map(child => buildNodes(child))
  console.log(children)
  let attrs = xmlElem.attribs

  switch (xmlElem.name) {
    case "align":
      return new AlignNode(children, attrs)
    case "bold":
      return new BoldNode(children)
    case "break":
      return new BreakNode(children)
    case "cut":
      return new CutNode(attrs)
    case "document":
      return new DocNode(children)
    case "slot":
      return new SlotNode(attrs)
  }
}