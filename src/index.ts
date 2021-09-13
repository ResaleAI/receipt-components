import { CascadingBytesBuilder } from './bytes_builder';
import {
  ReceiptComponent,
  ReceiptComponentBase,
  ReceiptPrinter,
} from './types';

export type PrinterType = 'TMT88IV' | 'TMT88V';

const supportedPrinters = {
  TMT88IV: {
    docWidth: 10,
    docWidthAlt: 20,
  },
  TMT88V: {
    docWidth: 20,
    docWidthAlt: 43,
  },
};

export default class Receipt {
  root: ReceiptComponent;
  printer: ReceiptPrinter;
  builder: CascadingBytesBuilder;

  constructor(root: ReceiptComponent, printer: PrinterType) {
    this.root = root;
    this.printer = supportedPrinters[printer] ?? 'TMT88IV';

    this.builder = new CascadingBytesBuilder({
      lineLength: [this.printer.docWidth],
      lineLengthAlt: [this.printer.docWidthAlt],
    });
  }

  Print(props: any): Uint8Array {
    let retVal = new Uint8Array([
      ...this.builder.RawBytes(CascadingBytesBuilder.bytes.ESC, '@'),
      ...this.root.Render(this.builder, props),
      ...this.builder.RawBytes(
        CascadingBytesBuilder.bytes.LF,
        CascadingBytesBuilder.bytes.GS,
        'V',
        'A',
        3
      ),
    ]);

    return retVal;
  }

  // Preview(): string {
  //   return this.root.html()
  // }
}
