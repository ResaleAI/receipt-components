import {
  ReceiptAST,
  ReceiptASTNodeRegistry,
  nodeRegistry,
  parseTemplateForAst,
} from '@resaleai/receipt-ast';
import {
  RCNodePlugin,
  RCRendererPlugin,
  RendererName,
} from '@resaleai/receipt-plugin';
import { InvalidRendererError } from './errors';

interface ReceiptComponentOptions<TProps> {
  render: (props: TProps) => string; // render function should return a template
  components?: ReceiptComponent<any>[];
  nodes?: ReceiptASTNodeRegistry;
  skipOptimization?: boolean;
}

export interface RenderPluginMap {
  [key: string]: RCRendererPlugin;
}

export class ReceiptComponent<TProps> {
  name: string;
  skipOptimization?: boolean;
  nodeRegistry: ReceiptASTNodeRegistry;
  renderTemplate: (props: TProps) => string;
  static renderers: RenderPluginMap = {} as RenderPluginMap;
  static astBuilders: ReceiptASTNodeRegistry = nodeRegistry;

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
      ...nodes,
      ...ReceiptComponent.astBuilders,
      ...componentBuilders,
    };
  }

  static registerRenderer(renderer: RCRendererPlugin) {
    this.renderers[renderer.name] = renderer;
  }

  // TODO: rename? maybe registerNodePlugin?
  static registerNodes(nodes: RCNodePlugin<any>[]) {
    nodes.forEach((node) => {
      this.astBuilders[node.name] = node.buildNode;
      for (const name of node.aliases ?? []) {
        this.astBuilders[name] = node.buildNode;
      }

      Object.entries(node.renderers).forEach(([rendererName, renderFunc]) => {
        const renderer = this.renderers[rendererName as RendererName];
        if (!renderer) {
          return;
        }
        renderer.registerRenderFunc(node.name, renderFunc);
      });
    });
  }

  async render<TOutput>(
    props: TProps,
    renderer: RendererName,
    children?: ReceiptAST[]
  ): Promise<TOutput> {
    const ast = this.buildAst(props, children);

    const rendererPlugin = ReceiptComponent.renderers[renderer];
    if (!rendererPlugin) {
      throw new InvalidRendererError(
        `Renderer ${renderer} not found, must be one of ${Object.keys(
          ReceiptComponent.renderers
        )}`
      );
    }

    return rendererPlugin.renderer(ast);
  }

  buildAst(props: TProps, children?: ReceiptAST[]) {
    const template = this.renderTemplate(props);
    return parseTemplateForAst(template, this.nodeRegistry, children);
  }
}
