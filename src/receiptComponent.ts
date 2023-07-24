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

interface ReceiptComponentOptions<TProps> {
  render: (props: TProps) => string; // render function should return a template
  components?: ReceiptComponent<any>[];
  nodes?: ReceiptASTNodeRegistry;
  skipOptimization?: boolean;
}
export class ReceiptComponent<TProps> {
  name: string;
  skipOptimization?: boolean;
  nodeRegistry: ReceiptASTNodeRegistry;
  renderTemplate: (props: TProps) => string;
  constructor(
    name: string,
    {
      render,
      components,
      nodes,
      skipOptimization,
    }: ReceiptComponentOptions<TProps>
  ) {
    this.name = name;
    this.renderTemplate = render;
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
    try {
      const template = this.renderTemplate(props);
      const populatedTemplate = parseBraces(template, props);
      return parseTemplateForAst(
        populatedTemplate,
        this.nodeRegistry,
        children
      );
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(`${this.name}: ${e.message}`);
      } else {
        throw new Error(`${this.name}: ${e}`);
      }
    }
  }
}
