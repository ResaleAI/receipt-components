const { parseDocument } = require("htmlparser2") 
const AlignNode = require("./nodes/align.js")
const BreakNode = require("./nodes/break.js");
const CutNode = require("./nodes/cut.js");
const ReceiptNode = require("./nodes/receipt.js");
const SlotNode = require("./nodes/slot.js");
const ReceiptText = require("./nodes/text.js");
const TextModsNode = require("./nodes/text-mod.js");
const UnderlineNode = require("./nodes/underline.js")
const ImageNode = require("./nodes/image.js")
const BarcodeNode = require("./nodes/barcode.js");
const SmoothingNode = require("./nodes/smoothing.js");
const ComponentNode = require("./nodes/component.js");
// parses using an xml parser and then builds relevant nodes
// may not be needed?
exports.parseMarkup = function(component) {
  // remove extra ws from xml stuff to prevent weirdness 
  let xmlStr = component.template.replace(/\n\s*/g, "")
  // parse the xml doc and find named slot elements, maybe want to change
  const dom = parseDocument(xmlStr, { xmlMode: true })

  return buildNodes(dom.children[0], component, {})
}



// builds node from xml element
function buildNodes(xmlElem, component, textMods) {

  switch(xmlElem.type) {
  case "text":
    // found text
    return new ReceiptText(xmlElem.data, textMods)
  case "tag":
    // build children first: -> -> ->
    //                      <- <- <-/
    
    let attrs = xmlElem.attribs
    let children = []
    if (xmlElem.name !== 'text' && xmlElem.name !== 'text-mod')
      children = xmlElem.children.map(child => buildNodes(child, component, textMods))
    
    switch (xmlElem.name) {
      case "align":
        return new AlignNode(children, attrs)

      case "barcode":
        return new BarcodeNode(attrs)

      case "break":
      case "br":
        return new BreakNode(attrs)

      case "cut":
        return new CutNode(attrs)

      case "receipt":
        return new ReceiptNode(children)

      case "image":
      case "img":
        return new ImageNode(attrs)

      case "slot":
        let newSlot = new SlotNode(children, attrs)
        component.slots[newSlot.name] = newSlot

        return newSlot

      case "text":
      case "text-mod":
        let tmNode = new TextModsNode([], attrs)
        tmNode.children = xmlElem.children.map(child => buildNodes(child, component, tmNode.mods))
        return tmNode

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
          // create new instance of component 
          return new ComponentNode(comp, attrs, children)
        }
      
      // no idea what the tag is
      throw new Error(`Tag not recognized (${xmlElem.name})`)
    }
  }
}

// WIP
  
  // this function looks for a <receipt> node, which
  // should be the root for all templated components.
  // The receipt node should only have one child.
  function parseTemplate(receiptTemplate) {
    // first ensure that first tag is receipt (input should be trimmed)
    const receiptRegex = /^<receipt>(.*)<\/receipt>$/gs
  
    try {
      let receiptContent = receiptRegex.exec(receiptTemplate)[1]
    } catch(e) {
      // error means they dont have receipt at root
      throw new Error("<receipt> must be template root")
    }
  
    const rootNode =  new ReceiptNode(
      receiptNodeFromXML(receiptContent, { component })
    )
  
  
  }
  
  // recursive function to parse an xml-like
  // tag with basic attributes and no namespaces or fanciness
  function receiptNodeFromXML(xmlStr, { component }) {
    // trim whitespace from the str
    xmlStr.trim()
  
    const openTagRegex = /<(\w+)([^\/>]*)/g
    
    let regexResult;
    let newNode;
  
    while (regexResult = openTagRegex.exec(xmlStr) !== null) {
      const nodeName = regexResult[1]
      const nodeUnparsedAttrs = regexResult[2]
  
      let nodeAttrs = parseAttrs(nodeUnparsedAttrs)
  
      // have tag info, check if self closing by looking at next char
      // and if it is '/' we assume self closing
      if (xmlStr[openTagRegex.lastIndex] === '/') {
        newNode = nodeFactory(nodeName, )
      }
      
  
  
    }
    
    // not an open close pair, hopefully a self-closing
    const selfClosingTagRegex = /^<(\w+)(.*) \/>/gs
  }