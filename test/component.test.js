import { ReceiptComponent } from '../src/component';

describe('receipt component', () => {
  test('basic nodes match bytes', () => {
    const Receipt = new ReceiptComponent({
      template: `<receipt>
  <underline>
    {{text}}
    <break />
  </underline>
  <underline heavy>
    {{text}}
  </underline>
  <cut />
</receipt>`,
    });

    const byteArray = [
      ...Receipt.renderPrinterBytes({
        text: 'The quick brown fox jumps over the lazy dog',
      }),
    ];
    const correctBytes = [
      0x1b, 0x40, 0x1b, 0x2d, 0x01, 0x54, 0x68, 0x65, 0x20, 0x71, 0x75, 0x69,
      0x63, 0x6b, 0x20, 0x62, 0x72, 0x6f, 0x77, 0x6e, 0x20, 0x66, 0x6f, 0x78,
      0x20, 0x6a, 0x75, 0x6d, 0x70, 0x73, 0x20, 0x6f, 0x76, 0x65, 0x72, 0x20,
      0x74, 0x68, 0x65, 0x20, 0x6c, 0x61, 0x7a, 0x79, 0x20, 0x64, 0x6f, 0x67,
      0x0a, 0x1b, 0x2d, 0x02, 0x54, 0x68, 0x65, 0x20, 0x71, 0x75, 0x69, 0x63,
      0x6b, 0x20, 0x62, 0x72, 0x6f, 0x77, 0x6e, 0x20, 0x66, 0x6f, 0x78, 0x20,
      0x6a, 0x75, 0x6d, 0x70, 0x73, 0x20, 0x6f, 0x76, 0x65, 0x72, 0x20, 0x74,
      0x68, 0x65, 0x20, 0x6c, 0x61, 0x7a, 0x79, 0x20, 0x64, 0x6f, 0x67, 0x0a,
      0x1b, 0x2d, 0x00, 0x1d, 0x56, 0x41, 0x03,
    ];

    // console.log(diffStringsRaw(String.fromCharCode(...correctBytes), String.fromCharCode(...byteArray), true))
  });
});
