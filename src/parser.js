import { parseDocument } from "htmlparser2" 
import AlignNode from "./nodes/align.js"
import BreakNode from "./nodes/break.js";
import CutNode from "./nodes/cut.js";
import ReceiptDocNode from "./nodes/receipt.js";
import SlotNode from "./nodes/slot.js";
import TextNode from "./nodes/text.js";
import TextModeNode from "./nodes/text-mode.js";
import SmallNode from "./nodes/small.js";
import UnderlineNode from "./nodes/underline.js"
import ImageNode from "./nodes/image.js"
import BarcodeNode from "./nodes/barcode.js"
import DoubleStrikeNode from "./nodes/double-strike.js"
import SmoothingNode from "./nodes/smoothing.js";

// parses using an xml parser and then builds relevant nodes
// may not be needed?
export function parseMarkup(component) {
  // remove extra ws from xml stuff to prevent weirdness
  let xmlStr = component.template.replace(/\n\s{2,}/g, "")

  // parse the xml doc and find named slot elements, maybe want to change
  const dom = parseDocument(xmlStr, { xmlMode: true })
  return buildNodes(dom.children[0], component)
}

// builds node from xml element
function buildNodes(xmlElem, component) {
  switch(xmlElem.type) {
  case "text":
    // found text
    return new TextNode(xmlElem.data, parseInt(xmlElem.parent.attribs.scale?.[0]) || 1, xmlElem.parent.attribs.altFont !== undefined)
  case "tag":

    // build children first: -> -> ->
    //                      <- <- <-/
    let children = xmlElem.children.map(child => child in component.components ? buildNodes(child, component.components[child]) : buildNodes(child, component))
    let attrs = xmlElem.attribs

    // add scale attr to children of mode nodes, maybe not good
    if (xmlElem.parent?.attribs?.scale !== undefined) {
      attrs.scale = xmlElem.parent.attribs.scale
    }

    switch (xmlElem.name) {
      case "align":
        return new AlignNode(children, attrs)
      case "barcode":
        return new BarcodeNode(attrs)
      case "break":
        return new BreakNode(attrs)
      case "cut":
        return new CutNode(attrs)
      case "document":
      case "receipt":
        return new ReceiptDocNode(children)
      case "double-strike":
        return new DoubleStrikeNode(children)
      case "image":
      case "img":
        return new ImageNode(attrs)
      case "slot":
        if (component.slotNode != null) {
          throw new Error("only one slot allowed atm")
        }
        return new SlotNode(component)
      case "text":
      case "mode":
        return new TextModeNode(children, attrs)
      case "small":
        return new SmallNode(children)
      case "smooth":
        return new SmoothingNode(children)
      case "underline":
        return new UnderlineNode(children, attrs)
      case "template":
        if (children.length > 1) {
          throw new Error("Template must have one child")
        }
        return children[0]
      default:
        let comp = component.components[xmlElem.name]
        if (comp !== undefined) {
          // component has nothing in slot
          if (children.length < 1) {
            return comp
          } else {
            // search thru component template for slot 
            comp.slotNode.children = children
            return comp
        }

      }

      // no idea what the tag is
      throw new Error(`Tag not recognized (${xmlElem.name})`)
    }
  }
}