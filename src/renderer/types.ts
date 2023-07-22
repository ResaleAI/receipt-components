import type { CoreNodeName, CoreNodeProps } from '@/core/node-builders';
import { ReceiptAST } from '@/core/types';

export type ReceiptNodeRenderFunc<TProps, TOutput> = (
  props: TProps,
  ...args: any[]
) => Promise<TOutput>;

export type CoreReceiptRenderer<TOutput> = {
  [key in CoreNodeName]: ReceiptNodeRenderFunc<CoreNodeProps[key], TOutput>;
};

export type ReceiptRenderFuncMap<TOutput> = {
  [key: string]: ReceiptNodeRenderFunc<any, TOutput>;
};

export type RegisterRendererFunc<
  TRenderFunc extends ReceiptNodeRenderFunc<any, any>
> = (name: string, renderFunc: TRenderFunc) => void;

export type ReceiptRenderer<TOutput> = (ast: ReceiptAST) => Promise<TOutput>;
