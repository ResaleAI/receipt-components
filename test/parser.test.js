import { ReceiptComponent } from '../src';

describe('template parser', () => {
  it('correctly renders smooth node *RENAME*', async () => {
    const Receipt = new ReceiptComponent({
      template: `<receipt>
        <smooth>
          <text>
            <smooth>
              <text scale="1:2">yo</text>
            </smooth>
          </text>
        </smooth>
        <smooth>test</smooth>
      </receipt>`,
    });

    await Receipt.parseTemplate();

    const byteBuff = Receipt.renderPrinterBytes();
    const byteArray = [...byteBuff];

    const correctByteArray = [
      27, 64, 29, 98, 1, 29, 33, 1, 121, 111, 29, 33, 0, 116, 101, 115, 116, 29,
      98, 0,
    ];

    expect(byteArray).toEqual(correctByteArray);
  });

  it('correctly renders text modes (simple)', async () => {
    const Receipt = new ReceiptComponent({
      template: `<receipt>
        <mode font="2">
          b
          <mode font="1">
            a
          </mode>
          b
        </mode>
        <mode font="2">b</mode>
      </receipt>`,
    });

    await Receipt.parseTemplate();

    const byteBuff = Receipt.renderPrinterBytes();
    const byteArray = [...byteBuff];

    const correctBytes = [
      27, 64, 27, 33, 1, 98, 27, 33, 0, 97, 27, 33, 1, 98, 98, 27, 33, 0,
    ];

    expect(byteArray).toEqual(correctBytes);
  });

  it('correctly renders text nodes (complex)', async () => {
    const Receipt = new ReceiptComponent({
      template: `<receipt>
        <align mode="center">
          <mode font="2">
            b
            <mode scale="1:2">
              b
              <mode font="1">a</mode>
            </mode>
            <mode font="1">
              a
              <mode font="2">b</mode>
              a
            </mode>
            b
          </mode>
          a
        </align>
      </receipt>`,
    });

    await Receipt.parseTemplate();

    const byteBuff = Receipt.renderPrinterBytes();
    const byteArray = [...byteBuff];

    const correctOutput = [
      27, 64, 27, 97, 1, 27, 33, 1, 98, 29, 33, 1, 98, 27, 33, 0, 97, 29, 33, 0,
      27, 33, 0, 97, 27, 33, 1, 98, 27, 33, 0, 97, 27, 33, 1, 98, 27, 33, 0, 97,
      27, 97, 0,
    ];

    expect(byteArray).toEqual(correctOutput);
  });

  it('correctly renders buy header', () => {
    const BuyHeader = new ReceiptComponent({
      template: `<receipt>
        <text bold font="2">
          <text scale="1:2">a</text>
          <text>b</text>
          <text scale="1:2">c</text>
          <text>d</text>
          <text scale="1:2">e</text>
          <break />
        </text>
    </receipt>`,
    });

    const correctOutput = [
      27, 64, 27, 33, 9, 29, 33, 1, 97, 29, 33, 0, 98, 29, 33, 1, 99, 29, 33, 0,
      100, 29, 33, 1, 101, 29, 33, 0, 10, 27, 33, 0,
    ];

    const byteBuff = BuyHeader.renderPrinterBytes();
    const byteArray = [...byteBuff];

    expect(byteArray).toEqual(correctOutput);
  });

  it('correctly renders alt fonts', async () => {
    const Receipt = new ReceiptComponent({
      template: `
      <receipt>
        <mode font="2">
          abc
        </mode>
        abc
      </receipt>`,
    });

    await Receipt.parseTemplate();

    const correctOutput = [
      27, 64, 27, 33, 1, 97, 98, 99, 27, 33, 0, 97, 98, 99,
    ];

    const byteBuff = Receipt.renderPrinterBytes();
    const byteArray = [...byteBuff];

    console.log(Receipt.renderHTML());

    expect(byteArray).toEqual(correctOutput);
  });
});
