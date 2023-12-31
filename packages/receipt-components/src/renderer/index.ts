import {
  CoreReceiptRenderer,
  ReceiptNodeRenderFunc,
  ReceiptRenderFuncMap,
  RegisterRendererFunc,
} from './types';

// TODO: im pretty sure we can infer TOutput from the TRenderFunc
export function buildReceiptRenderer<
  TOutput,
  TRenderFunc extends ReceiptNodeRenderFunc<any, TOutput>
>(
  coreRenderer: CoreReceiptRenderer<TOutput>
): [ReceiptRenderFuncMap<TOutput>, RegisterRendererFunc<TRenderFunc>] {
  const renderer: ReceiptRenderFuncMap<TOutput> = coreRenderer;

  const registerRenderer: RegisterRendererFunc<TRenderFunc> = (
    rendererName,
    renderFunc
  ) => {
    renderer[rendererName] = renderFunc;
  };

  return [renderer, registerRenderer];
}

// export all types
export * from './types';

