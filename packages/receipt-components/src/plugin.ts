import { ReceiptASTNode } from '@ast';
import {
  ReceiptNodeRenderFunc,
  ReceiptRenderer,
  RegisterRendererFunc,
} from '@renderer';

export type RendererName = keyof RendererMap;

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
