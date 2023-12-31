import { parseDocument } from 'htmlparser2';
import type { ChildNode } from 'domhandler';
import { ElementType } from 'domelementtype';
import { ReceiptAST, ReceiptASTNodeRegistry } from './types';
import { EmptyRootError, MultipleRootError, ParseError } from './errors';

// should this be moved to a separate folder? maybe....

export function parseTemplateForAst(
  template: string,
  nodes: ReceiptASTNodeRegistry,
  children?: ReceiptAST[],
  strict: boolean = false
): ReceiptAST {
  const xmlStr = template.replace(/\n\s*/g, '');
  const dom = parseDocument(xmlStr, { xmlMode: true });
  if (dom.children[0] === undefined) {
    throw new EmptyRootError('Root is empty');
  } else if (dom.children.length > 1) {
    throw new MultipleRootError(
      'Root cannot have multiple root nodes. (Hint: Try wrapping your template in a <fragment> node)'
    );
  }

  const root = buildAstFromXml(dom.children[0], nodes, strict, children);

  if (root.length === 0) {
    throw new EmptyRootError('Root is empty');
  }

  // this cant be tested, should i change types to accomodate this?
  return root[0]!;
}

export function buildAstFromXml(
  xmlNode: ChildNode,
  nodes: ReceiptASTNodeRegistry,
  strict: boolean,
  children?: ReceiptAST[]
): ReceiptAST[] {
  if (xmlNode.type === ElementType.Tag) {
    const nodeBuilder = nodes[xmlNode.name];
    Object.keys(xmlNode.attribs).forEach((attrib) => {
      if (xmlNode.attribs[attrib] === '') {
        // @ts-expect-error
        xmlNode.attribs[attrib] = true; // breaking typescript here on purpose
      } else if (isNumeric(xmlNode.attribs[attrib]!)) {
        // @ts-expect-error
        xmlNode.attribs[attrib] = Number(xmlNode.attribs[attrib]);
      }
    });

    // unfortunately we need to break typescript. if a node has a props with defaults and nothing is passed in, it will be null,
    // which breaks some stuff
    const props =
      Object.keys(xmlNode.attribs).length > 0 ? xmlNode.attribs : {};
    const nodeChildren = xmlNode.children.map(
      (child) => buildAstFromXml(child, nodes, strict, children)[0]!
    );
    if (!nodeBuilder) {
      if (strict) throw new ParseError(`Unknown node: ${xmlNode.name}`);

      // create the node using the info we have if not strict
      return [
        {
          name: xmlNode.name,
          props: props,
          children: nodeChildren,
        },
      ];
    }
    const ret = [nodeBuilder(props, nodeChildren)];
    return ret;
  }
  if (xmlNode.type === ElementType.Text) {
    const textData = xmlNode.data.trimEnd(); // is this doing anything?
    if (textData === '{ children }') {
      return children ?? [];
    }

    if (!nodes.textLiteral) {
      throw new ParseError("Missing textLiteral node builder")
    }
    return [nodes.textLiteral({ text: xmlNode.data })];
  }
  return [];
}

// From https://stackoverflow.com/a/175787
export function isNumeric(str: string) {
  if (typeof str != 'string') return false; // we only process strings!
  return (
    //@ts-expect-error
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}
