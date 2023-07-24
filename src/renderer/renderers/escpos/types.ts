export type EscPosByte = number;

export interface ReceiptNodeContext {
  textMode: number;
  scaleBits: number;
  currentAlign: 0 | 1 | 2;
  multiLine: boolean;
  defaultLineLength: number;
  altFontLineLength: number;
  currentOffset: number;
  numColsInLine: number;
}

export type ChildBuilder<
  TOutput,
  TContext extends ReceiptNodeContext = ReceiptNodeContext
> = (ctx?: TContext) => Promise<TOutput>;

export interface LinkedListNode<TData> {
  data: TData;
  next: LinkedListNode<TData> | null;
  prev: LinkedListNode<TData> | null;
}

export interface ILinkedList<TData> {
  length: number;
  head: LinkedListNode<TData> | null;
  tail: LinkedListNode<TData> | null;
  append(data: TData): void;
  prepend(data: TData): void;
  appendList(list: ILinkedList<TData>): ILinkedList<TData>;
  prependList(list: ILinkedList<TData>): ILinkedList<TData>;
  toUint8Array(): Uint8Array;
}

export type EscPos = ILinkedList<EscPosByte>;

export type EscPosRenderer<TProps> = (
  props: TProps,
  children?: ChildBuilder<EscPos>[],
  context?: ReceiptNodeContext
) => Promise<EscPos>;
