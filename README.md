# receipt-components

This package is for building complex and evolving receipts using a simple XML style language and component engine. The XML is converted to a simple JS representation that is then converted to either HTML or an ESC/POS byte array at runtime with supplied data.

## Concepts

### AST

The Abstract Syntax Tree (AST) is an intermediate form for the receipt components representing the structure of a receipt using a tree of receipt nodes that can take certain props

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

After that, import the `ReceiptComponent` class and create a new component with a name and render function that should take in props and return an array:

```javascript
import { ReceiptComponent } from '@resaleai/receipt-components';

let Receipt = new ReceiptComponent('Receipt', {
  template: `<receipt>
    <text bold>Hello world!</text>
  </receipt>`,
});
```

After building the template, you can render the component into whatever format you like. In this example, we'll render ESC/POS

```javascript
let epBytes = await Receipt.render({}, [], 'escpos'); // build the byte array
```

This will output

**printer bytes and html**

## Using props

For some more advanced use-cases you may need to pass data in to a receipt component

## Components

The component system is simple, but surprisingly powerful. Take, for instance, some sort of legalise that needs to be put on the bottom of every receipt:

```javascript
let ReceiptLegalise = new ReceiptComponent({
  template: `<receipt>
    <align mode="center">
      <text scale="7:0">-------</text>
      <break lines="3" />
      <text font="2" multiLine>{{ tnLegal }}</text>
      <break lines="3" />
      <text scale="7:0">-------</text>
    </align>
  </receipt>`,
});
```

This component, as well as any other components we need, can be used in the template of any other receipt component by registering it in the `components` constructor param.

```javascript
let Receipt = new ReceiptComponent({
  template:
  `<receipt>
    ...
    <ReceiptLegalise />
  </receipt>`
  components: {
    ReceiptLegalise
  }
})

let output = Receipt.renderPrinterBytes({
  tnLegal: "This is the legal statement, you are legally obligated to have a good time :)"
})
```

Note that the data is global. You must define any data you need in the render function.

## Default Nodes

## Installing Plugins

### TODO

- [x] update image package to correctly display images in html
- [x] finish browser image package
- [ ] create package just for types to reduce imported packages for plugin dev
- [ ] create better way for passing objects as props automatically
- [ ] create component option for just using function nodes
- [x] fix col new line and scale thing
- [ ] create offset prop for col
- [ ] allow row elem to control num cols in row
- [ ] nail down issues with text wrapping, scaling, and whatnot
- [ ] write docs and wiki
- [ ] allow passing and extending options to a different renderer
- [x] build html renderer
- [x] move images in to a separate package
- [ ] figure out way to let escpos context be extended
- [ ] write tests and clean up
