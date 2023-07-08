import { ChildBuilder, EscPos, ReceiptNodeContext, ReceiptNodeRegistry } from './types';
export declare function parseTemplateForEscPos(template: string, nodes: ReceiptNodeRegistry, context: ReceiptNodeContext, children?: ChildBuilder<EscPos>[]): Promise<EscPos>;
export declare function parseTemplateForHtml(template: string, nodes: ReceiptNodeRegistry, children?: string[]): string;
