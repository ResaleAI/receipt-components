import { buildAlignNode, buildBarcodeNode, buildBreakNode, buildFragmentNode, buildInverseNode, buildRootNode, buildScaleNode, buildSmoothNode, buildTextLiteralNode, buildTextNode } from './node-builders';
import { AlignNodeProps, BarcodeNodeProps, BreakNodeProps, ScaleNodeProps, TextLiteralNodeProps, TextNodeProps } from './types';

export { nodeRegistry, registerNodeBuilder } from './node-builders';
export * from './types';

declare global {
  namespace RC {
    interface NodeMap {
      align: {
        props: AlignNodeProps;
        builder: typeof buildAlignNode;
      };
      barcode: {
        props: BarcodeNodeProps;
        builder: typeof buildBarcodeNode;
      };
      break: {
        props: BreakNodeProps
        builder: typeof buildBreakNode;
      };
      fragment: {
        props: null;
        builder: typeof buildFragmentNode;
      };
      inverse: {
        props: null;
        builder: typeof buildInverseNode;
      };
      receipt: {
        props: null,
        builder: typeof buildRootNode;
      },
      scale: {
        props: ScaleNodeProps
        builder: typeof buildScaleNode;
      };
      smooth: {
        props: null;
        builder: typeof buildSmoothNode;
      };
      textLiteral: {
        props: TextLiteralNodeProps;
        builder: typeof buildTextLiteralNode;
      };
      text: {
        props: TextNodeProps
        builder: typeof buildTextNode;
      };
    }
  }
}