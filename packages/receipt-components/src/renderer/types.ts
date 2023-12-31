// TODO: update to use RC.NodeMap
import type {
  ReceiptAST,
} from '@/ast/index';

export type ReceiptNodeRenderFunc<TProps, TOutput> = (
  props: TProps,
  ...args: any[]
) => Promise<TOutput>;

export type CoreReceiptRenderer<TOutput> = {
  [key in keyof RC.NodeMap]: ReceiptNodeRenderFunc<
    Required<RC.NodeMap[key]['props']>,
    TOutput
  >;
};

export type ReceiptRenderFuncMap<TOutput> = {
  [key: string]: ReceiptNodeRenderFunc<any, TOutput>;
};

export type RegisterRendererFunc<
  TRenderFunc extends ReceiptNodeRenderFunc<any, any>
> = (name: string, renderFunc: TRenderFunc) => void;

export type ReceiptRenderer<TOutput> = (ast: ReceiptAST) => Promise<TOutput>;

