import { ChildBuilder, EscPos, ReceiptNodeContext } from '../types';
export declare const bytes: {
    readonly ESC: 27;
    readonly LF: 10;
    readonly NUL: 0;
    readonly GS: 29;
};
export declare const isNumber2dArray: (value: unknown) => value is number[][];
export declare const isUint8Array: (value: unknown) => value is Uint8Array[];
export declare const flattenEscPos: (children?: EscPos[] | undefined) => EscPos;
export declare function renderChildBytes(children?: ChildBuilder<EscPos>[], context?: ReceiptNodeContext): Promise<EscPos>;
export declare const charToByte: (char: string) => number;
export declare const parseBraces: (bracefulStr: string, data: any) => string;
export declare const populateChildren: (templateStr: string, children: string[]) => string;
export declare function duplicateContext<TContext>(context: TContext): any;
