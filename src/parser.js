const { parseDocument } = require("htmlparser2") 
const AlignNode = require("./nodes/align.js")
const BreakNode = require("./nodes/break.js");
const CutNode = require("./nodes/cut.js");
const ReceiptNode = require("./nodes/receipt.js");
const SlotNode = require("./nodes/slot.js");
const ReceiptText = require("./nodes/text.js");
const ImageNode = require("./nodes/image.js")
const BarcodeNode = require("./nodes/barcode.js");
const SmoothingNode = require("./nodes/smoothing.js");
const ComponentNode = require("./nodes/component.js");
const BaseNode = require("./nodes/base.js");
const TextModsNode = require("./nodes/text-mod.js");
// parses using an xml parser and then builds relevant nodes
// may not be needed?
exports.parseMarkup = function(component) {
  // remove extra ws from xml stuff to prevent weirdness 
  let xmlStr = component.template.replace(/\n\s*/g, "")
  // parse the xml doc and find named slot elements, maybe want to change
  const dom = parseDocument(xmlStr, { xmlMode: true })

  return buildNode(dom.children[0], component, component.defMods)
}



// builds node from xml element
function buildNode(xmlElem, component, baseMods) {
  switch(xmlElem.type) {
  case "text":
    // found text
    return new ReceiptText(xmlElem.data, baseMods)
  case "tag":
    let attrs = xmlElem.attribs
    let node;
    
    switch (xmlElem.name) {
      case "align":
        node = new AlignNode(baseMods, attrs)
        baseMods.alignByte = node.mode // update baseMods for children of this node

        node.baseMods = baseMods
        break

      case "barcode":
        node = new BarcodeNode(baseMods, attrs)
        break

      case "break":
      case "br":
        node = new BreakNode(baseMods, attrs)
        break

      case "cut":
        node = new CutNode(baseMods, attrs)
        break

      case "receipt":
        node = new ReceiptNode(baseMods, attrs)
        break

      case "image":
      case "img":
        node = new ImageNode(baseMods, attrs)

      case "slot":
        node = new SlotNode(baseMods, attrs)

        // set component slot.name prop to the node
        component.slots[node.name] = node
        break

      case "text":
      case "mode":
        node = new TextModsNode(baseMods, attrs)
        baseMods.textScaleByte = node.scaleByte
        baseMods.textModsByte = node.modByte
        baseMods.multiLine = node.multiLine

        node.baseMods = baseMods
        break

      case "smooth":
        baseMods.smoothingByte = 1
        node = new SmoothingNode(baseMods, attrs)
        break

      case "template":
        node = new BaseNode(baseMods, attrs)
        break
      
      default:
        let comp = component.components[xmlElem.name]
        if (comp !== undefined) {
          // create new instance of component 
          node = new ComponentNode(comp, baseMods, attrs)
          break
        }
        // no idea what the tag is
      throw new Error(`Tag not recognized (${xmlElem.name})`)
    }

    // parse children
    let childNode
    xmlElem.children.forEach((child, i) => {
      childNode = buildNode(child, component, {...baseMods})
      node.appendChild(childNode)
    })

    // last child
    return node
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