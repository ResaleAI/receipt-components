import { ReceiptNodeRegistry, ReceiptNodeContext, ReceiptNode, EscPos, ChildBuilder } from './types';
interface ReceiptComponentOptions {
    template: string;
    components?: ReceiptNodeRegistry;
}
export declare class ReceiptComponent<TProps> implements ReceiptNode<TProps> {
    template: string;
    nodeRegistry: ReceiptNodeRegistry;
    constructor({ template, components: nodes }: ReceiptComponentOptions);
    render(props: TProps, preview?: boolean): string | Promise<EscPos>;
    buildHtml(props: TProps, children?: ChildBuilder<string>[]): string;
    buildEscPos(props: TProps, children?: ChildBuilder<EscPos>[], context?: ReceiptNodeContext): Promise<EscPos>;
}
export {};
