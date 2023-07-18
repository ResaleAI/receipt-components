/* Core */

export type EscPos = number[] | Uint8Array;

export type ChildBuilder<
  TOutput,
  TContext extends ReceiptNodeContext = ReceiptNodeContext
> = (ctx?: TContext) => Promise<TOutput>;

export interface ReceiptNode<
  TProps,
  TContext extends ReceiptNodeContext = ReceiptNodeContext
> {
  buildHtml: (props: TProps, children?: string[], context?: TContext) => string;
  buildEscPos: (
    props: TProps,
    children?: ChildBuilder<EscPos, TContext>[],
    context?: TContext
  ) => Promise<EscPos>;
}

export interface ReceiptNodeRegistry {
  [key: string]: ReceiptNode<any, any>;
}

export interface ReceiptNodeContext {
  textMode: number;
  scaleBits: number;
  currentAlign: 0 | 1 | 2;
  multiLine: boolean;
  defaultLineLength: number;
  altFontLineLength: number;
  currentOffset: number;
}

/* Optimization */
export type OptimizationResult = { startIdx: number; length: number };
export type OptimizeFunc = (escpos: EscPos) => OptimizationResult[];

/* Pattern optimizer */
export type PatternChar = number | '*';

export type Pattern = PatternChar[];

export type PatternTree = {
  [key in PatternChar]?: PatternTree;
};
