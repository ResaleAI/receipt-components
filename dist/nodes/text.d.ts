import { ReceiptNode } from '../types';
interface TextNodeProps {
    font?: '1' | '2';
    bold?: boolean;
    long?: boolean;
    wide?: boolean;
    underline?: boolean;
    reset?: boolean;
}
declare const TextNode: ReceiptNode<TextNodeProps>;
export default TextNode;
