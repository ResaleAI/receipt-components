# receipt-components

[![npm version](https://badge.fury.io/js/@resaleai%2Freceipt-components.svg)](https://www.npmjs.com/package/@resaleai/receipt-components)
[![Tests](https://github.com/ResaleAI/receipt-components/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/ResaleAI/receipt-components/actions/workflows/test.yml)

This package is for building complex and evolving receipts using a simple XML style language and component engine. The XML is converted to a simple JS representation that is can then be rendered to any desired output. The maintainers of this package provide two renderers, one for ESC/POS and one for HTML previews.

## Concepts

### AST

The Abstract Syntax Tree (AST) is an intermediate form for the receipt components representing the structure of a receipt using a tree of receipt nodes that can take certain props

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

After that, import the `ReceiptComponent` class and create a new component with a name and render function that takes in props and returns a template:

```typescript
import { ReceiptComponent } from '@resaleai/receipt-components';

let Receipt = new ReceiptComponent<{ text: string }>('Receipt', {
  render: (props: { text: string }) => `<receipt>
    <text bold>${props.text}</text>
  </receipt>`,
});
```

After creating your component, you can then run the following to get your desired output:

```javascript
let epBytes = await Receipt.render({ text: 'Hello, world!' }, 'escpos'); // build the byte array
```

## Components

The component system is simple, but powerful. Take, for instance, some sort of legalise that needs to be put on the bottom of every receipt:

```typescript
let ReceiptLegalise = new ReceiptComponent<{ legal: string }>({
  render: (props: { legal: string }) => `<receipt>
    <align mode="center">
      -------------------------------
      <br />
      <text font="2">${ legal }</text>
      -------------------------------
    </align>
  </receipt>`,
});
```

This component, as well as any other components we need, can be used in the template of any other receipt component by registering it in the `components` constructor option.

```typescript
let Receipt = new ReceiptComponent<null>({
  render: () => {
    `<receipt>
      ...
      <ReceiptLegalise legal="This is a legal statement, you are legally obligated to star this repo ;)" />
    </receipt>`
  },
  components: [
    ReceiptLegalise
  ]
})

let epBytes = await Receipt.render(null, 'escpos'); // build the byte array

```

## Default Nodes

Some nodes are packaged with this library by default, for a full list of those check the [wiki](https://github.com/ResaleAI/receipt-components/wiki/Nodes).

## Installing Plugins

On top of the default functionality provided by this package, you can add custom renderers and nodes. For example, if I wanted to use the experimental HTML renderer to get a preview of my receipt before printing it, I can use the following code after installing the package:

```typescript
import htmlRenderer from '@resaleai/receipt-html-renderer';

ReceiptComponent.use([htmlRenderer]);

const Receipt = new ReceiptComponent('Receipt', ...)

let htmlStr = Receipt.render({}, 'html') // HTML markup that can be displayed in a browser
```

You can also install custom nodes. For example, to use images in a NodeJS environment:

```typescript
import imagePlugin from '@resaleai/receipt-image-node';

ReceiptComponent.use([imagePlugin]);

const Receipt = new ReceiptComponent<null>('Receipt', {
  render: (props: null) => `
  <receipt>
    <img src="..." />
  </receipt>
  `,
});

let epBytes = Receipt.render({}, 'escpos');
```

You can install multiple plugins at the same time:

```typescript
import imagePlugin from '@resaleai/receipt-image-node';
import htmlRenderer from '@resaleai/receipt-html-renderer';

ReceiptComponent.use([imagePlugin, htmlRenderer]);

const Receipt = new ReceiptComponent<null>('Receipt', {
  render: (props: null) => `
  <receipt>
    <img src="..." />
  </receipt>
  `,
});

let htmlStr = Receipt.render({}, 'html');
```

>[!NOTE]
> Nodes you install may not be comptible with all renderers. If you run into this, please contact the maintainer of the node plugin to see if they can add support for the renderer you want to use.

# Contributing

Want to help build this project? Check out the [contributing guide](./CONTRIBUTING.md) for more info. Don't know what to do? Check the TODO list below or open an issue to discuss ideas.

### TODO

- [x] update image package to correctly display images in html
- [x] finish browser image package
- [ ] create package just for types to reduce imported packages for plugin dev
- [ ] create better way for passing objects as props automatically
- [ ] create component option for just using function nodes
- [x] fix col new line and scale thing
- [x] nail down issues with text wrapping, scaling, and whatnot
- [ ] write docs and wiki
- [ ] allow passing and extending options to a different renderer
- [x] build html renderer
- [x] move images in to a separate package
- [x] figure out way to let escpos context be extended
- [x] write tests and clean up
- [ ] rebuild esc pos optimizer to work w new stuff
- [ ] disallow/only allow certain children on ast
- [ ] create layout package to allow for rows and cols
- [ ] move parser into separate package
- [ ] reduce packages (i think we can put plugin, ast, and renderer packages into main package)
- [ ] create examples for different frameworks (react, vue, etc)
