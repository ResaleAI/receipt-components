import { ReceiptComponent } from "@/receipt-component";
import { RCNodePlugin, RCRendererPlugin } from "@resaleai/receipt-plugin";
import {
  CoreReceiptRenderer,
  buildReceiptRenderer,
} from "@resaleai/receipt-renderer";
import { vi } from "vitest";

export const dummyNodePlugin: RCNodePlugin<null> = {
  name: "dummyNode",
  buildNode: vi.fn(() => ({ name: "dummy", props: null })),
  renderers: {
    dummyRenderer: vi.fn(async (props: null) => ({})),
  },
};
export const dummyNodePluginWithAlias: RCNodePlugin<null> = {
  name: "dummyNode",
  aliases: ["dmy"],
  buildNode: () => ({ name: "dummy", props: null }),
  renderers: {
    dummyRenderer: vi.fn(async (props: null) => ({})),
  },
};

export const [dummyRenderFuncRegistry, dummyRegisterFunc] =
  buildReceiptRenderer({} as CoreReceiptRenderer<any>);

export const dummyRenderer = vi.fn((ast: any) => "" as any);

export const dummyRendererPlugin: RCRendererPlugin = {
  name: "dummyRenderer",
  renderer: dummyRenderer,
  registerRenderFunc: dummyRegisterFunc,
};

export const dummyComponent = new ReceiptComponent("dummyComponent", {
  render: vi.fn(() => ""),
});
