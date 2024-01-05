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
} from '@/plugin';
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
  static nodePlugins: RCNodePlugin<any>[] = [];

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

    // iterate through all node plugins and register render functions
    this.nodePlugins.forEach((plugin) => {
      if (plugin.renderers[renderer.name]) {
        renderer.registerRenderFunc(plugin.name, plugin.renderers[renderer.name]);
      }
    });
  }

  // TODO: rename? maybe registerNodePlugin?
  static registerNodes(nodes: RCNodePlugin<any>[]) {
    nodes.forEach((node) => {
      // warn when node is already registered, as this may cause unexpected behavior
      if (this.astBuilders[node.name]) {
        console.warn('Node already registered', node.name);
      }
      this.astBuilders[node.name] = node.buildNode;
      this.nodePlugins.push(node);
      for (const name of node.aliases ?? []) {
        if (this.astBuilders[name]) {
          console.warn('Node already registered', name);
        }
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

  static use(plugins: (RCNodePlugin<any> | RCRendererPlugin)[]) {
    const nodes = plugins.filter(
      (plugin): plugin is RCNodePlugin<any> => (plugin as RCNodePlugin<any>).buildNode !== undefined
    );
    const renderers = plugins.filter(
      (plugin): plugin is RCRendererPlugin => (plugin as RCRendererPlugin).renderer !== undefined
    );
    this.registerNodes(nodes);
    renderers.forEach((renderer) => this.registerRenderer(renderer));
  }

  async render<TRenderer extends keyof RendererMap>(
    props: TProps,
    renderer: TRenderer,
    children?: ReceiptAST[]
  ): Promise<RendererMap[TRenderer]> {
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
