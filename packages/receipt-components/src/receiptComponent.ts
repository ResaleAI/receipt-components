import { parseBraces } from './util';
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

interface ReceiptComponentOptions<TProps> {
  render: (props: TProps) => string; // render function should return a template
  components?: ReceiptComponent<any>[];
  nodes?: ReceiptASTNodeRegistry;
  skipOptimization?: boolean;
}

type RenderPluginMap = {
  [key in RendererName]: RCRendererPlugin;
};

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
    this.renderers[renderer.name as RendererName] = renderer;
  }

  static registerNode<TProps>(node: RCNodePlugin<TProps>) {
    this.astBuilders[node.name] = node.buildNode;
    for (const name of node.aliases ?? []) {
      this.astBuilders[name] = node.buildNode;
    }

    Object.entries(node.renderers).forEach(([rendererName, renderFunc]) => {
      const renderer = this.renderers[rendererName as RendererName];
      if (!renderer) {
        throw new Error(`Renderer ${rendererName} not found`);
      }
      renderer.registerRenderFunc(node.name, renderFunc);
    });
  }

  render(
    props: TProps,
    children?: ReceiptAST[],
    renderer: RendererName = 'escpos'
  ) {
    const ast = this.buildAst(props, children);

    const rendererPlugin = ReceiptComponent.renderers[renderer];
    if (!rendererPlugin) {
      throw new Error(
        `Renderer ${renderer} not found, must be one of ${Object.keys(
          ReceiptComponent.renderers
        )}`
      );
    }

    if (!ast) {
      throw new Error('Error creating AST');
    }

    return rendererPlugin.renderer(ast);
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
