import { ReceiptNodeRegistry, ReceiptNodeContext, ReceiptNode, EscPos, ChildBuilder } from './types';
interface ReceiptComponentOptions {
    template: string;
    components?: ReceiptNodeRegistry;
    skipOptimization?: boolean;
}
export declare class ReceiptComponent<TProps> implements ReceiptNode<TProps> {
    template: string;
    skipOptimization?: boolean;
    nodeRegistry: ReceiptNodeRegistry;
    constructor({ template, components: nodes, skipOptimization, }: ReceiptComponentOptions);
    render(props: TProps, preview?: boolean): Promise<any>;
    buildHtml(props: TProps, children?: string[]): string;
    buildEscPos(props: TProps, children?: ChildBuilder<EscPos>[], context?: ReceiptNodeContext): Promise<any>;
}
export {};
