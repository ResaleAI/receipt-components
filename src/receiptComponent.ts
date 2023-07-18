import {
  AlignNode,
  BarcodeNode,
  BreakNode,
  ImageNode,
  RootNode,
  SmoothNode,
  TextNode,
} from './nodes';
import ScaleNode from './nodes/scale';
import optimizeEscPos from './optimizer';
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
  barcode: BarcodeNode,
  break: BreakNode,
  br: BreakNode,
  receipt: RootNode,
  scale: ScaleNode,
  smooth: SmoothNode,
  text: TextNode,
  image: ImageNode,
  img: ImageNode,
};

const defaultContext: ReceiptNodeContext = {
  textMode: 0,
  scaleBits: 0,
  currentAlign: 0,
  multiLine: true,
  defaultLineLength: 42,
  altFontLineLength: 56,
  currentOffset: 0,
};

interface ReceiptComponentOptions {
  template: string;
  components?: ReceiptNodeRegistry;
  skipOptimization?: boolean;
}

export class ReceiptComponent<TProps> implements ReceiptNode<TProps> {
  template: string;
  skipOptimization?: boolean;
  nodeRegistry: ReceiptNodeRegistry;
  constructor({
    template,
    components: nodes,
    skipOptimization,
  }: ReceiptComponentOptions) {
    this.template = template;
    this.skipOptimization = !!skipOptimization;
    this.nodeRegistry = { ...nodeRegistry, ...nodes };
  }

  async render(props: TProps, preview = false) {
    if (preview) {
      return await this.buildHtml(props);
    }
    return await this.buildEscPos(props);
  }

  buildHtml(props: TProps, children?: string[]) {
    const populatedTemplate = parseBraces(this.template, props);
    return parseTemplateForHtml(populatedTemplate, this.nodeRegistry, children);
  }

  async buildEscPos(
    props: TProps,
    children?: ChildBuilder<EscPos>[],
    context: ReceiptNodeContext = defaultContext
  ) {
    const populatedTemplate = parseBraces(this.template, props);
    const escpos = await parseTemplateForEscPos(
      populatedTemplate,
      this.nodeRegistry,
      context,
      children
    );

    if (this.skipOptimization) {
      return escpos;
    }
    return optimizeEscPos(escpos);
  }
}

export function registerGlobalComponents(
  components: ReceiptNodeRegistry,
  force = false
) {
  for (const key in components) {
    if (!force && nodeRegistry[key]) {
      throw new Error(
        `Component ${key} already exists. Set second argument to true to override.`
      );
    }
    nodeRegistry[key] = components[key];
  }
}
