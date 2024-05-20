import ReceiptComponent, { FRC, ReceiptASTNodeRegistry, parseTemplateForAst } from "@resaleai/receipt-components";

export interface RCTemplateOptions {
  components?: {
    [key: string]: FRC<any>
  },
  nodes?: ReceiptASTNodeRegistry
}

function rcFromTemplate<TProps>(templateFunc: (props: TProps) => string, options?: RCTemplateOptions): FRC<TProps> {
  const nodes = {
    ...ReceiptComponent.getNodes(),
    ...options?.nodes,
    ...options?.components
  };

  return (props, children) => {
    const template = templateFunc(props);
    return parseTemplateForAst(template, nodes, children);
  }
}

export default rcFromTemplate;