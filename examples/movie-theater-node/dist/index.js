"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const receipt_components_1 = __importStar(require("@resaleai/receipt-components"));
const AdmissionDisclaimer_1 = __importDefault(require("./components/AdmissionDisclaimer"));
// import LineItemList from './components/LineItemList';
const RewardsInfo_1 = __importDefault(require("./components/RewardsInfo"));
// import hr from './components/hr';
const util_1 = require("./util");
// import TrxInfo from './components/TrxInfo';
const TheaterHeader_1 = __importDefault(require("./components/TheaterHeader"));
const receipt_image_node_1 = __importDefault(require("@resaleai/receipt-image-node"));
const receipt_html_renderer_1 = __importDefault(require("@resaleai/receipt-html-renderer"));
const process_1 = __importDefault(require("process"));
const receipt_layout_1 = __importDefault(require("@resaleai/receipt-layout"));
receipt_components_1.default.use(receipt_image_node_1.default).use(receipt_layout_1.default).use(receipt_html_renderer_1.default);
// TODO: add when layout package is ready
// <LineItemList items="${lineItems}" paymentMethod="CREDIT Card" />
// <TrxInfo trxId="${props.trxInfo.trxId}" dateStr="${trxDateStr}" cashier="${props.trxInfo.cashier}" register="${props.trxInfo.register}" />
// const MovieReceipt = new ReceiptComponent<MovieReceiptProps>('MovieReceipt', {
//   render: (props) => {
//     const lineItems = serializeObject(props.lineItems);
//     const trxDateStr = `${props.trxInfo.date.toLocaleString('en-us', {
//       month: 'numeric',
//       day: 'numeric',
//       year: 'numeric',
//     })} ${props.trxInfo.date.toLocaleString('en-us', {
//       timeStyle: 'short',
//       hourCycle: 'h23',
//     })}`;
//     return `
// <receipt>
//   <TheaterHeader theaterName="${props.theaterName}" address="${props.address}" city="${props.city}" state="${props.state}" zip="${props.zip}" />
//   <img maxWidth=".3" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/1200px-Tux.svg.png" align="center" />
//   <AdmissionDisclaimer />
//   ${props.lineItems.map((li) => {
//     return `<text>
//     ${li.name} (x${li.quantity}): ${li.price}
//   </text>
//   <br />`
//   }).join('')}
//   <br />
//   <RewardsInfo cardNumberLast4="${props.rewardInfo.cardNumberLast4}" creditsEarned="${props.rewardInfo.creditsEarned}" creditsUsed="${props.rewardInfo.creditsUsed}" creditBalance="${props.rewardInfo.creditBalance}" />
// </receipt>
//     `;
//   },
//   components: [
//     hr,
//     AdmissionDisclaimer,
//     TheaterHeader,
//     LineItemList,
//     RewardsInfo,
//     TrxInfo,
//   ],
// });
function MovieReceipt(props) {
    const lineItems = (0, util_1.serializeObject)(props.lineItems);
    const trxDateStr = `${props.trxInfo.date.toLocaleString('en-us', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
    })} ${props.trxInfo.date.toLocaleString('en-us', {
        timeStyle: 'short',
        hourCycle: 'h23',
    })}`;
    return (0, receipt_components_1.rc)('receipt', null, [
        (0, TheaterHeader_1.default)({
            theaterName: props.theaterName,
            address: props.address,
            city: props.city,
            state: props.state,
            zip: props.zip,
        }),
        (0, receipt_components_1.rc)('image', {
            maxWidth: 0.3,
            src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/1200px-Tux.svg.png',
            align: 'center',
        }),
        (0, AdmissionDisclaimer_1.default)(null, [
            (0, receipt_components_1.rc)('textLiteral', { text: 'Have a great day!' }),
        ]),
        ...props.lineItems.map((li) => {
            return (0, receipt_components_1.rc)('text', {}, [
                (0, receipt_components_1.text)(`${li.name} (x${li.quantity}): ${li.price}`),
            ]);
        }),
        (0, RewardsInfo_1.default)({
            cardNumberLast4: props.rewardInfo.cardNumberLast4,
            creditsEarned: props.rewardInfo.creditsEarned,
            creditsUsed: props.rewardInfo.creditsUsed,
            creditBalance: props.rewardInfo.creditBalance,
        }),
    ]);
}
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
(0, receipt_components_1.render)(MovieReceipt, 'html', receiptData).then((html) => {
    process_1.default.stdout.write(html);
});
