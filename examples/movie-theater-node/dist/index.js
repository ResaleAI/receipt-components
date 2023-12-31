"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const receipt_components_1 = require("@resaleai/receipt-components");
const receipt_image_node_1 = __importDefault(require("@resaleai/receipt-image-node"));
const receipt_html_renderer_1 = __importDefault(require("@resaleai/receipt-html-renderer"));
const process_1 = __importDefault(require("process"));
const MovieTheater_1 = __importDefault(require("./receipts/MovieTheater"));
// import layoutPlugin from '@resaleai/receipt-layout';
// ReceiptComponent.registerNodes(layoutPlugin);
receipt_components_1.ReceiptComponent.use(receipt_image_node_1.default).use(receipt_html_renderer_1.default);
const receiptData = {
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
(0, receipt_components_1.renderRC)(MovieTheater_1.default, 'html', receiptData).then((html) => {
    process_1.default.stdout.write(html);
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
