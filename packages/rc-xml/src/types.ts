export type ReceiptASTNode<TProps> = {
  readonly name: string;
  readonly props: TProps;
  readonly children?: ReceiptASTNode<any>[];
};

export type ReceiptASTNodeBuilder<TProps> = (
  props: TProps,
  children?: ReceiptAST[]
) => ReceiptASTNode<TProps>;

export type ReceiptAST = ReceiptASTNode<any>;

export type ReceiptASTNodeRegistry = {
  [key: string]: ReceiptASTNodeBuilder<any>;
};