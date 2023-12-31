import { ReceiptASTNode } from '@/ast/index';
import {
  ReceiptNodeRenderFunc,
  ReceiptRenderer,
  RegisterRendererFunc,
} from '@/renderer';
import { ReceiptComponent } from './receipt-component';

declare global {
  namespace RC {
    interface RendererMap {}
  }
}

export type RCPlugin = {
  // TODO: remove generic arg from RC class after people have updated
  install: (rc: typeof ReceiptComponent) => void
}

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

