# receipt-components

This package is for building complex and evolving receipts using a simple XML style language and component engine. The XML is converted to a simple JS representation that is then converted to either HTML or an ESC/POS byte array at runtime with supplied data.

## Getting started

First, install the package with yarn or npm:

`npm install @resaleai/receipt-components`

After that, import the `ReceiptComponent` class and create a new component with a template:

```javascript
import { ReceiptComponent } from '@resaleai/receipt-components';

let Receipt = new ReceiptComponent({
  template: `<receipt>
    <text bold>Hello world!</text>
  </receipt>`,
});
```

## Dependancies

This project tries not to use any deps, but the image processing does require access to a `Canvas` API. This is always available in the browser, and can be simulated using another package, such as...

After building the template, you can render the component into either HTML or the ESC/POS bytes using

```javascript
let htmlStr = Receipt.renderHTML(); // build the HTML
let epBytes = Receipt.renderPrinterBytes(); // build the byte array
```

This will output

**printer bytes and html**

## Templated

On top of this, there is a simple templating engine built in for putting dynamic data in the receipts.

**example**

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

### TODO

[ ] write more/better tests and clean up linked list implementation
