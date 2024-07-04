# receipt-components

[![npm version](https://badge.fury.io/js/@resaleai%2Freceipt-components.svg)](https://www.npmjs.com/package/@resaleai/receipt-components)
[![Tests](https://github.com/ResaleAI/receipt-components/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/ResaleAI/receipt-components/actions/workflows/test.yml)

This package is for building complex and evolving receipts using a simple XML style language and component engine. The XML is converted to a simple JS representation that is can then be rendered to any desired output. The maintainers of this package provide two renderers, one for ESC/POS and one for HTML previews.

## Concepts

### AST

The Abstract Syntax Tree (AST) is an intermediate form for the receipt components representing the structure of a receipt using a tree of receipt nodes that can take certain props. The AST mechanism allows for the separation of the receipt's structure from the rendering logic, enabling the use of different renderers for different outputs.

### Node

A node is a basic object that can then be transformed by renderers into a desired output. As opposed to components, when creating nodes you define the exact outputs for nodes which can allow for custom behavior not possible with components.

### Component

A component is a special kind of AST node that uses a render function to build a template string that can then be parsed and turned into an AST.

### Renderer

A renderer is a function that takes in an AST and returns a certain kind of output. For example, the default renderer in this project is for ESC/POS and will return a byte array that you can use to print receipts. You can install other kinds of renderers as plugins.

### Plugins

A plugin is one of two things:

- A custom node that defines an AST builder and render functions for different renderers.
- A custom renderer

## Getting started

First, install the package with the package manager of your choosing:

`npm install @resaleai/receipt-components`

After that, you can create receipts using plain old JavaScript functions:

```typescript
import { rc, text, render } from '@resaleai/receipt-components';

// create the receipt component
function Receipt {
  return rc('receipt', null, [text('Hello, world!')]);
}

// render the receipt component to the esc/pos format
const epBytes = await render(Receipt, 'escpos', null);

// send the bytes to a printer
```

You can also create more complex receipts using the component system:

```typescript
import { rc, text, render } from '@resaleai/receipt-components';

// create a store header component containing information about the store
function StoreHeader(props: { storeAddress: string }) {
  return rc('align', { mode: 'center' }, [
    rc('scale', { width: 2, height: 2 }, [text('Store Name')]),
    text(props.storeAddress),
  ]);
}

// create a receipt that will be printed
function Receipt() {
  return rc('receipt', null, [
    StoreHeader({ storeAddress: '123 Main St' }),
    text('Thank you for your purchase!'),
  ]);
}

const epBytes = await render(Receipt, 'escpos', null);
```

Finally, receipt components can have children passed in, to create even more powerful composition:

```typescript
import { rc, text, render } from '@resaleai/receipt-components';
import type { ReceiptAST } from '@resaleai/receipt-components';

// create a store header component containing information about the store
function StoreHeader(
  props: { storeAddress: string },
  children: ReceiptAST[] = []
) {
  return rc('align', { mode: 'center' }, [
    ...children,
    text(props.storeAddress),
  ]);
}

// create a receipt that will be printed
function Receipt() {
  return rc('receipt', null, [
    StoreHeader({ storeAddress: '123 Main St' }, [
      rc('scale', { width: 2, height: 2 }, [text('Store Name')]),
    ]),
    text('Thank you for your purchase!'),
  ]);
}

const epBytes = await render(Receipt, 'escpos', null);
```

## Building receipts with XML

Because of the flexible nature of this library, you can also build receipts using custom input languages. We have implemented a simple XML-like language that can be used to build receipts.

To start, install the XML parser package:

`npm install @resaleai/rc-xml`

Then, you can build receipts using the XML language:

```typescript
import { rcFromTemplate } from '@resaleai/rc-xml';
import { render } from '@resaleai/receipt-components';

const Receipt = rcFromTemplate((props: null) => {
  return `
      <receipt>
        <align mode="center">
          <scale width="2" height="2">
            <text>Store Name</text>
          </scale>
          123 Main St
        </align>
        <text>Thank you for your purchase!</text>
      </receipt>
    `;
});

const epBytes = await render(Receipt, 'escpos', null);
```

The XML input language also supports custom components, though you will need to register them so that the parser knows how to handle them:

```typescript
import { rcFromTemplate } from '@resaleai/rc-xml';

const StoreHeader = rcFromTemplate((props: { storeAddress: string }) => {
  return `
    <align mode="center">
      <scale width="2" height="2">
        <text>Store Name</text>
      </scale>
      ${props.storeAddress}
    </align>
  `;
});

const Receipt = rcFromTemplate(
  (props: null) => {
    return `
    <receipt>
      <StoreHeader storeAddress="123 Main St" />
      <text>Thank you for your purchase!</text>
    </receipt>
  `;
  },
  {
    components: {
      StoreHeader,
    },
  }
);
```

> [!NOTE]
> The XML parser is still a work in progress. It currently does not support passing complicated objects as props to custom components. Until this is finished, consider breaking the object down into its individual properties and passing them in as separate props.

## Installing plugins for custom rendering and nodes

Outside of the functionality provided by this package, you can add custom renderers and nodes. For example, if I wanted to use the experimental HTML renderer to get a preview of my receipt before printing it, I can install the following package:

`npm install @resaleai/receipt-html-renderer`

Then, I can use the renderer in my code by importing the `ReceiptComponent` and the renderer plugin, and then using the plugin like so:

```typescript
import htmlRenderPlugin from '@resaleai/receipt-html-renderer';
import ReceiptComponent, {
  rc,
  text,
  render,
} from '@resaleai/receipt-components';

ReceiptComponent.use(htmlRenderPlugin);

function Receipt {
  return rc('receipt', null, [text('Hello, world!')]);
}

const htmlStr = await render(Receipt, 'html', null);

// display the html string in a browser
```

You can also install custom nodes and chain together `use` functions to install multiple plugins at once. For example, to render images in a receipt you can do the following:

```typescript
import imagePlugin from '@resaleai/receipt-image-node';
import htmlRenderPlugin from '@resaleai/receipt-html-renderer';
import ReceiptComponent, {
  rc,
  text,
  render,
} from '@resaleai/receipt-components';

ReceiptComponent.use(imagePlugin).use(htmlRenderPlugin);

function Receipt {
  return rc('receipt', null, [
    rc('image', { src: 'https://example.com/image.png' }),
    text('Hello, world!'),
  ]);
}

const htmlStr = await render(Receipt, 'html', null);
```

> [!NOTE]
> Nodes you install may not be comptible with all renderers. If you run into this, please contact the maintainer of the node plugin to see if they can add support for the renderer you want to use.

## Default Nodes

Some nodes are packaged with this library by default, for a full list of those check the [wiki](https://github.com/ResaleAI/receipt-components/wiki/Nodes).

## Prebuilt Plugins

- [HTML Renderer](https://github.com/ResaleAI/receipt-components/tree/main/packages/plugins/renderers/receipt-html-renderer)
- [Image Node for NodeJS](https://github.com/ResaleAI/receipt-components/tree/main/packages/plugins/nodes/receipt-image-node)
- [Image Node for Browsers](https://github.com/ResaleAI/receipt-components/tree/main/packages/plugins/nodes/receipt-image-browser)

# Contributing

Want to help build this project? Check out the [contributing guide](./CONTRIBUTING.md) for more info. Don't know what to do? Check the TODO list below or open an issue to discuss ideas.

### TODO

Don't see a feature you want? Check the list below to see if it is being worked on, or [open an issue](https://github.com/ResaleAI/receipt-components/issues/new)

- [x] update image package to correctly display images in html
- [x] finish browser image package
- [ ] create better way for passing objects as props automatically
- [x] create component option for just using function nodes
- [x] fix col new line and scale thing
- [x] nail down issues with text wrapping, scaling, and whatnot
- [ ] write docs and wiki
- [ ] allow passing and extending options to a different renderer
- [x] build html renderer
- [x] move images in to a separate package
- [x] figure out way to let escpos context be extended
- [ ] write tests and clean up
- [ ] rebuild esc pos optimizer to work w new stuff
- [ ] disallow/only allow certain children on ast
- [ ] create layout package to allow for rows and cols
- [x] move parser into separate package
- [x] reduce packages (i think we can put plugin, ast, and renderer packages into main package)
- [ ] create examples for different frameworks (react, vue, etc)
- [ ] add more codepages
- [ ] add autoencoder for text
- [ ] figure out how to support printer-specific commands (beeping for escpos)
- [ ] decouple nodes from escpos origin (bold node, underline node, etc)

#### NODES

- [ ] QR
- [ ] PDF417
- [ ] justification
