export type EscPos = number[] | Uint8Array;

export interface ReceiptNodeContext {
  textMode: number;
  scaleBits: number;
  currentAlign: 0 | 1 | 2;
  multiLine: boolean;
  defaultLineLength: number;
  altFontLineLength: number;
  currentOffset: number;
}

export type ChildBuilder<
  TOutput,
  TContext extends ReceiptNodeContext = ReceiptNodeContext
> = (ctx?: TContext) => Promise<TOutput>;
