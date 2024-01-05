import { ReceiptComponent } from "@/receipt-component";
import { RCNodePlugin, RCRendererPlugin } from "@resaleai/receipt-plugin";
import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  dummyComponent,
  dummyNodePlugin,
  dummyNodePluginWithAlias,
  dummyRenderFuncRegistry,
  dummyRenderer,
  dummyRendererPlugin,
} from "./helpers/dummies";
import { InvalidRendererError } from "@/errors";
import { nodeRegistry } from "@resaleai/receipt-ast";

describe("receipt-component", () => {
  describe("ReceiptComponent", () => {
    describe("constructor", () => {
      it("should set the name", () => {
        const component = new ReceiptComponent("test", {
          render: () => "",
        });
        expect(component.name).toBe("test");
      });

      it("should set the render function", () => {
        const render = () => "";
        const component = new ReceiptComponent("test", {
          render,
        });
        expect(component.renderTemplate).toBe(render);
      });

      it("should set the node registry", () => {
        const component = new ReceiptComponent("test", {
          render: () => "",
          nodes: { test: () => ({ name: "test", props: null }) },
        });
        expect(component.nodeRegistry.test).toBeDefined();
      });

      it("should use ReceiptComponent.astBuilders in nodeRegistry", () => {
        ReceiptComponent.registerNodes([dummyNodePlugin]);
        const component = new ReceiptComponent("test", {
          render: () => "",
        });
        expect(component.nodeRegistry.dummyNode).toBeDefined();
      });

      it("should use passed in nodes in nodeRegistry", () => {
        const component = new ReceiptComponent("test", {
          render: () => "",
          nodes: { test: () => ({ name: "test", props: null }) },
        });
        expect(component.nodeRegistry.test).toBeDefined();
      });

      it("should use passed in components in nodeRegistry", () => {
        const component = new ReceiptComponent("test", {
          render: () => "",
          components: [dummyComponent],
        });

        expect(component.nodeRegistry.dummyComponent).toBeDefined();
      });
    });

    describe("render", () => {
      beforeEach(() => {
        ReceiptComponent.renderers = {};
        ReceiptComponent.astBuilders = { ...nodeRegistry };
      });
      it("should throw an error if no renderer is found", async () => {
        const component = new ReceiptComponent("test", {
          render: () => "<receipt></receipt>",
        });
        await expect(component.render({}, "escpos")).rejects.toThrow();
      });

      it("should render using the correct renderer", async () => {
        const component = new ReceiptComponent("test", {
          render: () => "<receipt></receipt>",
        });
        ReceiptComponent.registerRenderer(dummyRendererPlugin);
        // @ts-expect-error
        await expect(component.render({}, "dummyRenderer"));
        expect(dummyRenderer).toHaveBeenCalled();
      });
    });

    describe("buildAst", () => {
      it("should build AST from renderTemplate function", () => {
        const render = () => "<root></root>";
        const component = new ReceiptComponent<null>("test", {
          render,
        });
        const ast = component.buildAst(null);
        expect(ast).toEqual({
          name: "root",
          props: {},
          children: [],
        });
      });
      it("should build AST and pass props to renderTemplate function", () => {
        const render = vi.fn((props: any) => `<root>${props.test}</root>`);
        const component = new ReceiptComponent("test", {
          render,
        });

        const ast = component.buildAst({ test: "test" });
        expect(render).toHaveBeenCalledWith({ test: "test" });
      });
    });
  });
  describe("ReceiptComponent.registerRenderer", () => {
    beforeEach(() => {
      ReceiptComponent.renderers = {};
      ReceiptComponent.astBuilders = { ...nodeRegistry };
    });
    it("should register a renderer", () => {
      ReceiptComponent.registerRenderer({ name: "test" } as RCRendererPlugin);
      expect(ReceiptComponent.renderers.test).toBeDefined();
    });

    it("should allow overriding a renderer", () => {
      const r1 = { name: "test" } as RCRendererPlugin;
      const r2 = { name: "test" } as RCRendererPlugin;
      ReceiptComponent.registerRenderer(r1);
      ReceiptComponent.registerRenderer(r2);
      expect(ReceiptComponent.renderers.test).toBe(r2);
    });
  });

  describe("ReceiptComponent.registerNode", () => {
    beforeEach(() => {
      ReceiptComponent.renderers = {};
      ReceiptComponent.astBuilders = {};
    });
    it("should register a node", () => {
      ReceiptComponent.registerRenderer(dummyRendererPlugin);
      ReceiptComponent.registerNodes([dummyNodePlugin]);
      expect(ReceiptComponent.astBuilders.dummyNode).toBe(
        dummyNodePlugin.buildNode
      );
    });

    it("should allow registering a node with renderers not defined on instance", () => {
      ReceiptComponent.registerNodes([dummyNodePlugin]);
      expect(ReceiptComponent.astBuilders.dummyNode).toBe(
        dummyNodePlugin.buildNode
      );
    });

    it("should register aliases for a node", () => {
      ReceiptComponent.registerNodes([dummyNodePluginWithAlias]);
      expect(ReceiptComponent.astBuilders.dummyNode).toBe(
        dummyNodePluginWithAlias.buildNode
      );
      expect(ReceiptComponent.astBuilders.dmy).toBe(
        dummyNodePluginWithAlias.buildNode
      );
    });

    it("should allow overriding a node", () => {
      ReceiptComponent.registerNodes([dummyNodePlugin]);
      ReceiptComponent.registerNodes([dummyNodePluginWithAlias]);
      expect(ReceiptComponent.astBuilders.dummyNode).toBe(
        dummyNodePluginWithAlias.buildNode
      );
    });

    it("should register node renderers to installed renderers", () => {
      ReceiptComponent.registerRenderer(dummyRendererPlugin);
      ReceiptComponent.registerNodes([dummyNodePlugin]);
      expect(dummyRenderFuncRegistry.dummyNode).toBeDefined();
    });
  });
});
