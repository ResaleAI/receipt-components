export declare type EscPos = number[] | Uint8Array;
export declare type ChildBuilder<TOutput, TContext extends ReceiptNodeContext = ReceiptNodeContext> = (ctx?: TContext) => Promise<TOutput>;
export interface ReceiptNode<TProps, TContext extends ReceiptNodeContext = ReceiptNodeContext> {
    buildHtml: (props: TProps, children?: ChildBuilder<string, TContext>[], context?: TContext) => string;
    buildEscPos: (props: TProps, children?: ChildBuilder<EscPos, TContext>[], context?: TContext) => Promise<EscPos>;
}
export interface ReceiptNodeRegistry {
    [key: string]: ReceiptNode<any, any>;
}
export interface ReceiptNodeContext {
    textMode: number;
    scaleBits: number;
}
