import { parseBraces } from './util';
import { nodeRegistry } from './core/node-builders';
import { ReceiptAST, ReceiptASTNodeRegistry } from './core/types';
import { parseTemplateForAst } from './core/parser';
import { ReceiptRenderer } from './renderer/types';
import {
  ReceiptComponentConfig,
  ReceiptRendererPlugin,
  ReceiptRendererPluginRegistry,
} from './types';

const config: ReceiptComponentConfig = {
  renderers: {},
};

export function registerRendererPlugin(rendererPlugin: ReceiptRendererPlugin) {
  config.renderers[rendererPlugin.name] = rendererPlugin.renderer;
}

interface ReceiptComponentOptions {
  template: string;
  components?: ReceiptComponent<any>[];
  nodes?: ReceiptASTNodeRegistry;
  skipOptimization?: boolean;
}
export class ReceiptComponent<TProps> {
  name: string;
  template: string;
  skipOptimization?: boolean;
  nodeRegistry: ReceiptASTNodeRegistry;
  constructor(
    name: string,
    { template, components, nodes, skipOptimization }: ReceiptComponentOptions
  ) {
    this.name = name;
    this.template = template;
    this.skipOptimization = !!skipOptimization;
    const componentBuilders = components?.reduce(
      (acc, component) => ({
        ...acc,
        [component.name]: component.buildAst.bind(component),
      }),
      {}
    );
    this.nodeRegistry = {
      ...nodeRegistry,
      ...nodes,
      ...componentBuilders,
    };
  }

  render(props: TProps, children?: ReceiptAST[], renderer: string = 'escpos') {
    const ast = this.buildAst(props, children);

    const rendererPlugin = config.renderers[renderer];
    if (!rendererPlugin) {
      throw new Error(`Renderer ${renderer} not found`);
    }

    return rendererPlugin(ast);
  }

  buildAst(props: TProps, children?: ReceiptAST[]) {
    const populatedTemplate = parseBraces(this.template, props);
    return parseTemplateForAst(populatedTemplate, this.nodeRegistry, children);
  }
}
