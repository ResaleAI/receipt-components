import { parseDocument } from 'htmlparser2';
import type { ChildNode } from 'domhandler';
import { ElementType } from 'domelementtype';
import { ReceiptAST, ReceiptASTNodeRegistry } from './types';
import TextLiteralNodeBuilder from './node-builders/text-literal';

// should this be moved to a separate folder? maybe....

export function parseTemplateForAst(
  template: string,
  nodes: ReceiptASTNodeRegistry,
  children?: ReceiptAST[]
) {
  const xmlStr = template.replace(/\n\s*/g, '');
  const dom = parseDocument(xmlStr, { xmlMode: true });
  const root = buildAstFromXml(dom.children[0], nodes, children);

  return root[0];
}

export function buildAstFromXml(
  xmlNode: ChildNode,
  nodes: ReceiptASTNodeRegistry,
  children?: ReceiptAST[]
): ReceiptAST[] {
  if (xmlNode.type === ElementType.Tag) {
    const nodeBuilder = nodes[xmlNode.name];
    const nodeChildren = xmlNode.children.map(
      (child) => buildAstFromXml(child, nodes, children)[0]
    );
    if (!nodeBuilder) {
      // throw new Error(`Unknown node: ${xmlNode.name}`);
      // create the node using the info we have
      return [
        {
          name: xmlNode.name,
          props: xmlNode.attribs,
          children: nodeChildren,
        },
      ];
    }
    const ret = [nodeBuilder(xmlNode.attribs, nodeChildren)];
    return ret;
  }
  if (xmlNode.type === ElementType.Text) {
    const textData = xmlNode.data.trimEnd();
    if (textData === '{ children }') {
      return children ?? [];
    }
    return [TextLiteralNodeBuilder({ text: xmlNode.data })];
  }
  return [];
}
