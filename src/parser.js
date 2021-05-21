import { parseDocument } from 'htmlparser2';
import parseImage from './util/process-image';
import AlignNode from './nodes/align.js';
import BreakNode from './nodes/break.js';
import CutNode from './nodes/cut.js';
import ReceiptNode from './nodes/receipt.js';
import SlotNode from './nodes/slot.js';
import ReceiptText from './nodes/text.js';
import ImageNode from './nodes/image.js';
import BarcodeNode from './nodes/barcode.js';
import SmoothingNode from './nodes/smoothing.js';
import BaseNode from './nodes/base.js';
import TextModsNode from './nodes/text-mod.js';

// parses using an xml parser and then builds relevant nodes
// may not be needed?
export async function parseMarkup(component) {
  // remove extra ws from xml stuff to prevent weirdness
  const xmlStr = component.template.replace(/\n\s*/g, '');
  // parse the xml doc and find named slot elements, maybe want to change
  const dom = parseDocument(xmlStr, { xmlMode: true });

  let root = await buildNode(dom.children[0], component, component.defMods);

  console.log(`${root}`);

  return root;
}

// builds node from xml element
async function buildNode(xmlElem, component, mods) {
  switch (xmlElem.type) {
    case 'text': {
      // found text
      return new ReceiptText(xmlElem.data, mods);
    }
    case 'tag': {
      const attrs = xmlElem.attribs;
      let node;

      switch (xmlElem.name) {
        // !! The mods object is at runtime here
        case 'align':
          node = new AlignNode(mods, attrs);
          break;

        case 'barcode':
          node = new BarcodeNode(mods, attrs);
          break;

        case 'break':
        case 'br':
          node = new BreakNode(mods, attrs);
          break;

        case 'cut':
          node = new CutNode(mods, attrs);
          break;

        case 'receipt':
          node = new ReceiptNode(mods, attrs);
          break;

        // the async req
        case 'image':
        case 'img': {
          node = new ImageNode(mods, attrs);
          await node.prepareImage();
          break;
        }
        case 'slot':
          node = new SlotNode(mods, attrs);
          component.slots[node.name] = node; // set component slots.name prop to the node
          break;

        // !! The mods object is at runtime here
        case 'text':
        case 'mode':
          node = new TextModsNode(mods, attrs);
          break;

        // !! The mods object is at runtime here
        case 'smooth':
          node = new SmoothingNode(mods, attrs);
          break;

        case 'template':
          node = new BaseNode(mods, attrs);
          break;

        default: {
          const childComp = component.components[xmlElem.name];
          if (childComp === undefined) {
            throw new Error(`Tag not recognized (${xmlElem.name})`);
          }

          if (childComp.nodeTree === null) await childComp.parseTemplate();
          // create new instance of component
          const compInstance = Object.assign({}, childComp);
          compInstance.prototype = childComp.prototype;

          // set default mods for child comp to current mods
          compInstance.defMods = mods;

          // set slot to be first child
          compInstance.slots['default'] = this.firstChild;
          break;
        }
      }
      // parse children
      for (let i = 0; i < xmlElem.children.length; i++) {
        let child = xmlElem.children[i];
        var childNode = await buildNode(child, component, { ...node.mods }); // use the nodes mods
        console.log(`finish ${childNode}`);
        node.appendChild(childNode);
      }

      return node;
    }
  }
}

// WIP for no deps

// this function looks for a <receipt> node, which
// should be the root for all templated components.
// The receipt node should only have one child.
function parseTemplate(receiptTemplate) {
  // first ensure that first tag is receipt (input should be trimmed)
  const receiptRegex = /^<receipt>(.*)<\/receipt>$/gs;

  try {
    const receiptContent = receiptRegex.exec(receiptTemplate)[1];
  } catch (e) {
    // error means they dont have receipt at root
    throw new Error('<receipt> must be template root');
  }

  const rootNode = new ReceiptNode(
    receiptNodeFromXML(receiptContent, { component })
  );
}

// recursive function to parse an xml-like
// tag with basic attributes and no namespaces or fanciness
function receiptNodeFromXML(xmlStr, { component }) {
  // trim whitespace from the str
  xmlStr.trim();

  const openTagRegex = /<(\w+)([^\/>]*)/g;

  let regexResult;
  let newNode;

  while ((regexResult = openTagRegex.exec(xmlStr) !== null)) {
    const nodeName = regexResult[1];
    const nodeUnparsedAttrs = regexResult[2];

    const nodeAttrs = parseAttrs(nodeUnparsedAttrs);

    // have tag info, check if self closing by looking at next char
    // and if it is '/' we assume self closing
    if (xmlStr[openTagRegex.lastIndex] === '/') {
      newNode = nodeFactory(nodeName);
    }
  }

  // not an open close pair, hopefully a self-closing
  const selfClosingTagRegex = /^<(\w+)(.*) \/>/gs;
}
