export declare type EscPos = number[] | Uint8Array;
export declare type ChildBuilder<TOutput, TContext extends ReceiptNodeContext = ReceiptNodeContext> = (ctx?: TContext) => Promise<TOutput>;
export interface ReceiptNode<TProps, TContext extends ReceiptNodeContext = ReceiptNodeContext> {
    buildHtml: (props: TProps, children?: string[], context?: TContext) => string;
    buildEscPos: (props: TProps, children?: ChildBuilder<EscPos, TContext>[], context?: TContext) => Promise<EscPos>;
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
}
export declare type OptimizationResult = {
    startIdx: number;
    length: number;
};
export declare type OptimizeFunc = (escpos: EscPos) => OptimizationResult[];
export declare type PatternChar = number | '*';
export declare type Pattern = PatternChar[];
export declare type PatternTree = {
    [key in PatternChar]?: PatternTree;
};
