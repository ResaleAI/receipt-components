import TextNode from './nodes/text';
import { optimizeEscPos } from './optimizer';
import { ReceiptComponent } from './receiptComponent';
import { ReceiptNodeContext, ReceiptNode } from './types';

const FunctionComponent: ReceiptNode<null> = {
  buildHtml(props, children, context) {
    return '';
  },

  buildEscPos(_props, children) {
    const ctx: ReceiptNodeContext = {
      textMode: 0,
      scaleBits: 0,
    };
    return TextNode.buildEscPos(
      {
        bold: true,
      },
      [
        (childCtx) =>
          TextNode.buildEscPos(
            {
              font: '2',
            },
            children,
            childCtx
          ),
      ],
      ctx
    );
  },
};

const TemplateComponent = new ReceiptComponent({
  template: `<text bold><scale width="3" height="2">{ children }</scale></text>`,
});

const FunctionReceipt = new ReceiptComponent({
  template: `<receipt><FunctionComponent>Hello, world!</FunctionComponent></receipt>`,
  components: {
    FunctionComponent,
  },
});

interface Props {
  text: string;
}

const TemplateReceipt = new ReceiptComponent<Props>({
  template: `<receipt><TemplateComponent>{ text }</TemplateComponent></receipt>`,
  components: {
    TemplateComponent,
  },
});

TemplateReceipt.buildEscPos({ text: 'Hello, world!' }).then((escPos) => {
  console.log('template receipt: ', [...escPos]);
});
FunctionReceipt.buildEscPos(null).then((escPos) => {
  console.log('function receipt: ', [...escPos]);
});

// const template = `
//     <text bold><text font="2">{ children }</text></text>`;

// interface TestReceiptProps {
//   text: string;
// }

// const TestReceipt = new ReceiptComponent({
//   template,
// });

// const TestReceipt2 = new ReceiptComponent({
//   template: `<receipt><TestReceipt>Hello, world!</TestReceipt></receipt>`,
//   components: {
//     TestReceipt,
//   },
// });

// console.log('template: ', [...TestReceipt.buildEscPos({})]);
// console.log('template 2: ', [...TestReceipt2.buildEscPos(null)]);
