import { ReceiptComponent, renderRC } from '@resaleai/receipt-components';
import imagePlugin from '@resaleai/receipt-image-node';
import htmlRenderPlugin from '@resaleai/receipt-html-renderer';
import process from 'process';
import MovieReceipt, { MovieReceiptProps } from './receipts/MovieTheater';
// import layoutPlugin from '@resaleai/receipt-layout';

// ReceiptComponent.registerNodes(layoutPlugin);
ReceiptComponent.use(imagePlugin).use(htmlRenderPlugin);

const receiptData: MovieReceiptProps = {
  theaterName: 'Movie Land',
  address: '510 Faker Street',
  city: 'Springfield',
  state: 'ZZ',
  zip: '99999',
  lineItems: [
    {
      name: 'Horror Movie',
      quantity: 1,
      price: 15.99,
    },
    {
      name: 'Small Popcorn',
      quantity: 1,
      price: 7.37,
    },
    {
      name: 'Small Pepsi',
      quantity: 1,
      price: 5.84,
    },
  ],
  trxInfo: {
    trxId: 12345678,
    cashier: 'Zavier',
    register: '1',
    date: new Date(),
  },
  rewardInfo: {
    cardNumberLast4: '1234',
    creditsEarned: 1337,
    creditsUsed: 0,
    creditBalance: 2400,
  },
};

renderRC(MovieReceipt, 'escpos', receiptData).then((html) => {
  process.stdout.write(html);
});

// const TestReceipt = new ReceiptComponent<null>('TestReceipt', {
  //   render(props) {
    //     return `
// <receipt>
  //   <row>
    //     <col cols="4">
      //       This is a long string, testing how line breaking works
    //     </col>
    //     <col cols="2" />
    //     <col cols="3" justify="center">
      //       This is a long string, testing how line breaking works
    //     </col>
  //   </row>
// </receipt>`;
  //   },
// });

// TestReceipt.render<Uint8Array>(null, 'escpos').then((html) => {
  //   process.stdout.write(html);
// });

// const TestReceipt2 = new ReceiptComponent<null>('TestReceipt2', {
//   render(props) {
//     return `
// <receipt>
//   <row>
//     <col cols="4">
//       Test
//     </col>
//     <col cols="2" />
//     <col cols="3" justify="right">
//       Test
//     </col>
//   </row>
// </receipt>`;
//   },
// });

// TestReceipt2.render<Uint8Array>(null, 'escpos').then((html) => {
//   process.stdout.write(html);
// });
