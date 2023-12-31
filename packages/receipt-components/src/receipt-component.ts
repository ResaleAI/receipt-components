import {
  ReceiptAST,
  ReceiptASTNode,
  ReceiptASTNodeRegistry,
  nodeRegistry,
} from '@resaleai/receipt-ast';
import {
  RCNodePlugin,
  RCRendererPlugin,
  RendererName,
} from '@resaleai/receipt-plugin';
import { InvalidRendererError } from './errors';

export interface RenderPluginMap {
  [key: string]: RCRendererPlugin;
}

export class ReceiptComponent {
  private static renderers: RenderPluginMap = {} as RenderPluginMap;
  private static astBuilders: ReceiptASTNodeRegistry = nodeRegistry;
  private static nodePlugins: RCNodePlugin<any>[] = [];

  constructor() {
    throw new Error('ReceiptComponent should not be instantiated');
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

  static getNodes() {
    return this.astBuilders;
  }

  static getRenderers() {
    return this.renderers;
  }
}

// type of functional receipt component
export type RFC<TProps> = (props: TProps, children?: ReceiptAST[]) => ReceiptASTNode<TProps>;

export function rc<TNodeName extends keyof NodeMap>(name: TNodeName, ...args: Parameters<NodeMap[TNodeName]['builder']>) {
  // @ts-ignore
  return ReceiptComponent.getNodes()[name](...args);
}

export function text(text: string) {
  return rc('textLiteral', { text });
}

export async function render<TProps, TRendererName extends keyof RendererMap>(component: RFC<TProps>, rendererName: TRendererName, props: TProps, children?: ReceiptAST[]): Promise<RendererMap[TRendererName]> {
  const ast = component(props, children);
  const renderer = ReceiptComponent.getRenderers()[rendererName];

  if (!renderer) {
    throw new InvalidRendererError(`Renderer ${rendererName} not found`);
  }

  return renderer.renderer(ast);
}