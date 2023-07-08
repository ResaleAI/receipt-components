import { TextNode } from './nodes';
import optimizeEscPos from './optimizer';
import { ReceiptComponent } from './receiptComponent';
import { ReceiptNodeContext, ReceiptNode } from './types';

const FunctionComponent: ReceiptNode<null> = {
  buildHtml(props, children) {
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
  template: `<text bold><text reset>{ children }</text></text>`,
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
  console.log('original: ', escPos);
  const optimized = optimizeEscPos(escPos);
  console.log('optimized: ', optimized);
});
// FunctionReceipt.buildEscPos(null).then((escPos) => {
//   console.log('function receipt: ', [...escPos]);
// });

const TestReceipt = new ReceiptComponent({
  template: `<receipt>
  <align mode="center">
    <text bold>{ storeName }</text>
  </align>
  <br lines="2"/>
  <text font="2">Order details for { customer }</text>
</receipt>`,
});

// console.log(
//   'what?',
//   TestReceipt.buildHtml({ storeName: 'Cool Cookies', customer: 'John Doe' })
// );

// const tree = buildPatternTree();

// printPatternTree(tree);

// const testData = [27, 33, 8, 27, 33, 9];

// const result = matchPattern(tree, testData, 0);

// console.log('result: ', result);

// const optimized = optimizeEscPos(testData);

// console.log('optimized: ', optimized);

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
