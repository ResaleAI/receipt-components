import { ReceiptASTNode } from '@resaleai/receipt-ast';
import {
  ReceiptNodeRenderFunc,
  ReceiptRenderer,
  RegisterRendererFunc,
} from '@resaleai/receipt-renderer';

declare global {
  interface RenderPluginMap {}
}

export type RendererName = keyof RenderPluginMap;

export type RCRendererPlugin = {
  name: string;
  renderer: ReceiptRenderer<any>;
  registerRenderFunc: RegisterRendererFunc<any>;
};

export type RCNodePlugin<TProps> = {
  name: string;
  aliases?: string[];
  buildNode: (props: TProps) => ReceiptASTNode<TProps>;
  renderers: {
    [key: string]: ReceiptNodeRenderFunc<TProps, unknown>;
  };
};
