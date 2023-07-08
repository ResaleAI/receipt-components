import { parseDocument } from 'htmlparser2';
import type { ChildNode } from 'domhandler';
import { ElementType } from 'domelementtype';
import {
  ChildBuilder,
  EscPos,
  ReceiptNodeContext,
  ReceiptNodeRegistry,
} from './types';
import { flattenEscPos, renderChildBytes } from './util';

/* ESC/POS */

export async function parseTemplateForEscPos(
  template: string,
  nodes: ReceiptNodeRegistry,
  context: ReceiptNodeContext,
  children?: ChildBuilder<EscPos>[]
) {
  const xmlStr = template.replace(/\n\s*/g, '');
  const dom = parseDocument(xmlStr, { xmlMode: true });
  const root = buildEscPos(dom.children[0], nodes, context, children);

  return root;
}

async function buildEscPos(
  xmlNode: ChildNode,
  nodes: ReceiptNodeRegistry,
  context?: ReceiptNodeContext,
  children?: ChildBuilder<EscPos>[]
): Promise<EscPos> {
  if (xmlNode.type === ElementType.Tag) {
    const node = nodes[xmlNode.name];
    if (!node) {
      throw new Error(`Unknown node: ${xmlNode.name}`);
    }
    const nodeChildren: ChildBuilder<EscPos>[] = xmlNode.children.map(
      (child) => (childCtx?: ReceiptNodeContext) =>
        buildEscPos(child, nodes, childCtx, children)
    );
    return node.buildEscPos(xmlNode.attribs, nodeChildren, context);
  }
  if (xmlNode.type === ElementType.Text) {
    if (xmlNode.data === '{ children }') {
      return renderChildBytes(children);
    }
    return Buffer.from(xmlNode.data);
  }
  return [];
}

/* HTML */

export function parseTemplateForHtml(
  template: string,
  nodes: ReceiptNodeRegistry,
  children?: string[]
) {
  const xmlStr = template.replace(/\n\s*/g, '');
  const dom = parseDocument(xmlStr, { xmlMode: true });
  const root = buildHtml(dom.children[0], nodes, children);

  return root;
}

function buildHtml(
  xmlNode: ChildNode,
  nodes: ReceiptNodeRegistry,
  children?: string[]
): string {
  if (xmlNode.type === ElementType.Tag) {
    const node = nodes[xmlNode.name];
    if (!node) {
      console.log(xmlNode);
      throw new Error(`Unknown node: ${xmlNode.name}`);
    }
    const nodeChildren: string[] = xmlNode.children.map((child) =>
      buildHtml(child, nodes, children)
    );
    return node.buildHtml(xmlNode.attribs, nodeChildren);
  }
  if (xmlNode.type === ElementType.Text) {
    if (xmlNode.data === '{ children }') {
      return children?.join('') ?? '';
    }
    return xmlNode.data;
  }
  return '';
}
