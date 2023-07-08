import { AlignNode, BreakNode, RootNode, SmoothNode, TextNode } from './nodes';
import ScaleNode from './nodes/scale';
import { parseTemplateForEscPos, parseTemplateForHtml } from './parser';
import {
  ReceiptNodeRegistry,
  ReceiptNodeContext,
  ReceiptNode,
  EscPos,
  ChildBuilder,
} from './types';
import { parseBraces } from './util';

const nodeRegistry: ReceiptNodeRegistry = {
  align: AlignNode,
  break: BreakNode,
  br: BreakNode,
  receipt: RootNode,
  scale: ScaleNode,
  smooth: SmoothNode,
  text: TextNode,
};

const defaultContext: ReceiptNodeContext = {
  textMode: 0,
  scaleBits: 0,
};

interface ReceiptComponentOptions {
  template: string;
  components?: ReceiptNodeRegistry;
}

export class ReceiptComponent<TProps> implements ReceiptNode<TProps> {
  template: string;
  nodeRegistry: ReceiptNodeRegistry;
  constructor({ template, components: nodes }: ReceiptComponentOptions) {
    this.template = template;
    this.nodeRegistry = { ...nodeRegistry, ...nodes };
  }

  render(props: TProps, preview = false) {
    if (preview) {
      return this.buildHtml(props);
    }
    return this.buildEscPos(props);
  }

  buildHtml(props: TProps, children?: string[]) {
    const populatedTemplate = parseBraces(this.template, props);
    return parseTemplateForHtml(populatedTemplate, this.nodeRegistry, children);
  }

  buildEscPos(
    props: TProps,
    children?: ChildBuilder<EscPos>[],
    context: ReceiptNodeContext = defaultContext
  ) {
    const populatedTemplate = parseBraces(this.template, props);
    return parseTemplateForEscPos(
      populatedTemplate,
      this.nodeRegistry,
      context,
      children
    );
  }
}
