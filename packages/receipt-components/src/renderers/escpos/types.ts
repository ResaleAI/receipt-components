export type EscPosByte = number;

export type ChildBuilder<
  TOutput,
  TContext extends RC.ReceiptNodeContext = RC.ReceiptNodeContext
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
  insertListBefore(
    list: ILinkedList<TData>,
    node: LinkedListNode<TData>
  ): ILinkedList<TData>;
  insertListAfter(
    list: ILinkedList<TData>,
    node: LinkedListNode<TData>
  ): ILinkedList<TData>;
  appendList(list: ILinkedList<TData>): ILinkedList<TData>;
  prependList(list: ILinkedList<TData>): ILinkedList<TData>;
  subList(
    startNode: LinkedListNode<TData>,
    endNode: LinkedListNode<TData>
  ): ILinkedList<TData>;
  toUint8Array(): Uint8Array;
}

export type EscPos = ILinkedList<EscPosByte>;

export type EscPosRenderer<TProps> = (
  props: TProps,
  children?: ChildBuilder<EscPos>[],
  context?: RC.ReceiptNodeContext
) => Promise<EscPos>;

export type EscPosRendererArr<TProps> = (
  props: TProps,
  children?: ChildBuilder<number[]>[],
  context?: RC.ReceiptNodeContext
) => Promise<number[]>;
