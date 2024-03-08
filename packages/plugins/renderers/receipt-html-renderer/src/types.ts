export type HtmlRenderer<TProps> = (
  props: TProps,
  children?: string[]
) => Promise<string>;
