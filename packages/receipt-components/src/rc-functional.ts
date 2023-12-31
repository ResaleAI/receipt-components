import { ReceiptASTNode, ReceiptAST, ReceiptASTNodeRegistry } from "@/ast/index";
import { ReceiptComponent } from "./receipt-component";
import { InvalidNodeError, InvalidRendererError } from "./errors";

export type FRC<TProps> = (props: TProps, children?: ReceiptAST[]) => ReceiptASTNode<TProps>;

// TODO: investigate not allowing children to be passed in if not defined in component
export async function renderRC<TProps, TRendererName extends keyof RC.RendererMap>(component: FRC<TProps>, renderer: TRendererName, props: TProps, children?: ReceiptAST[]): Promise<RC.RendererMap[TRendererName]> {
  // @ts-ignore
  const ast = component(props, children);
  const rendererPlugin = ReceiptComponent.getRenderer(renderer);
  if (!rendererPlugin) {
    throw new InvalidRendererError(`Renderer not found: ${renderer}`);
  }

  return rendererPlugin.renderer(ast);
}

export function rc<TNodeName extends keyof RC.NodeMap>(name: TNodeName, ...args: Parameters<RC.NodeMap[TNodeName]['builder']>): ReceiptASTNode<any> {
  const builder = ReceiptComponent.getNodes()[name] as RC.NodeMap[TNodeName]['builder'];
  // TODO: add strict option
  if (!builder) {
    throw new InvalidNodeError(`Node not found: ${name}`);
  }

  // TODO: this code works, why is TS complaining?
  // @ts-ignore
  return builder(...args);
}

export function t(t: string) {
  return rc('textLiteral', { text: t });
}

// export function rcFromTemplate<TProps>(templateFunc: (props: TProps) => string, options?: RCTemplateOptions): FRC<TProps> {
//   const nodes = {
//     ...ReceiptComponent.getNodes(),
//     ...options?.nodes,
//     ...options?.components,
//   };

//   return (props, children) => {
//     const template = templateFunc(props);
//     return parseTemplateForAst(template, nodes, children);
//   }
// }