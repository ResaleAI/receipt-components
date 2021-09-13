import Receipt from '.';
import { ReceiptComponent } from './types';

interface Props {
  text: string;
}

const TestComponent: ReceiptComponent = {
  Render(builder, props: Props): number[] {
    return builder.RenderComponent('AlignComponent', { mode: 1 }, (builder) => {
      return builder.RenderComponent(
        'BoldComponent',
        {},
        (builder): number[] => {
          return builder.RawBytes(props.text);
        }
      );
    });
  },
};

const FontTest: ReceiptComponent = {
  Render(builder, props): number[] {
    return [
      ...builder.RenderComponent('FontComponent', { type: 1 }, (builder) => [
        ...builder.RawBytes('b'),
        ...builder.RenderComponent('FontComponent', { type: 0 }, (builder) =>
          builder.RawBytes('a')
        ),
        ...builder.RawBytes('b'),
      ]),
      ...builder.RawBytes('a'),
      ...builder.RenderComponent('FontComponent', { type: 1 }, (builder) =>
        builder.RawBytes('b')
      ),
    ];
  },
};

const TestReceipt = new Receipt(FontTest, 'TMT88IV');

console.log(TestReceipt.Print({ text: 'Hello World!' }));
