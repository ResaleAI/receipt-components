import { CascadingBytesBuilder } from "./bytes_builder";

export interface ReceiptComponentBase {
  components?: {
    [name: string]: ReceiptComponent;
  }

  data?: {
    [name: string]: any;
  }

  propDefs?: {
    [name: string]: any;
  }

  methods?: {
    [name: string]: (...args: any[]) => any;
  }

}

export interface ReceiptComponent extends ReceiptComponentBase {
  Render(builder: CascadingBytesBuilder, props: any, children?: (builder: CascadingBytesBuilder) => number[]): number[];
}

export interface XMLReceiptComponent extends ReceiptComponentBase {
  template: string;
}

export interface Receipt {
  builder: CascadingBytesBuilder
  root: ReceiptComponent
}

export interface ReceiptPrinter {
  docWidth: number
  docWidthAlt: number
}