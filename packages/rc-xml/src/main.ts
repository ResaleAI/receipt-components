import ReceiptComponent, { FRC, ReceiptASTNodeRegistry } from '@resaleai/receipt-components';
export { parseTemplateForAst } from './parser';
export * from './types';

import { parseTemplateForAst } from './parser';

export type RCTemplateOptions = {
  components?: {
    [key: string]: FRC<any>;
  },
  nodes?: ReceiptASTNodeRegistry
}


function createXMLParser(rc: ReceiptComponent) {
  return {
    rcFromTemplate: <TProps>(templateFunc: (props: TProps) => string, options?: RCTemplateOptions): FRC<TProps> => {
      const nodes = {
        ...ReceiptComponent.getNodes(),
        ...options?.nodes,
        ...options?.components,
      };
  
      return (props, children) => {
        const template = templateFunc(props);
        return parseTemplateForAst(template, nodes, children);
      }
    }

  }
}

export default createXMLParser(ReceiptComponent);