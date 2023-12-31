import {
  ReceiptASTNodeRegistry,
  nodeRegistry,
} from '@/ast/index';
import { RCNodePlugin, RCPlugin, RCRendererPlugin } from './plugins';

export interface RenderPluginMap {
  [key: string]: RCRendererPlugin;
}

export class ReceiptComponent {
  static renderers: RenderPluginMap = {} as RenderPluginMap;
  static astBuilders: ReceiptASTNodeRegistry = nodeRegistry;
  static nodePlugins: RCNodePlugin<any>[] = [];

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
        const renderer = this.renderers[rendererName as keyof RC.RendererMap];
        if (!renderer) {
          return;
        }
        renderer.registerRenderFunc(node.name, renderFunc);
      });
    });
  }

  static use(plugin: RCPlugin) {
    plugin.install(this);
    
    // return this for chaining
    return this;
  }

  static getRenderer(renderer: keyof RC.RendererMap) {
    return this.renderers[renderer];
  }

  static getNodes() {
    return this.astBuilders;
  }
}
