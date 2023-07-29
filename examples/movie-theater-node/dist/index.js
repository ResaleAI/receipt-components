"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const receipt_components_1 = __importDefault(require("@resaleai/receipt-components"));
const AdmissionDisclaimer_1 = __importDefault(require("./components/AdmissionDisclaimer"));
const LineItemList_1 = __importDefault(require("./components/LineItemList"));
const RewardsInfo_1 = __importDefault(require("./components/RewardsInfo"));
const hr_1 = __importDefault(require("./components/hr"));
const util_1 = require("./util");
const TrxInfo_1 = __importDefault(require("./components/TrxInfo"));
const TheaterHeader_1 = __importDefault(require("./components/TheaterHeader"));
const receipt_image_node_1 = __importDefault(require("@resaleai/receipt-image-node"));
const receipt_html_renderer_1 = __importDefault(require("@resaleai/receipt-html-renderer"));
const process_1 = __importDefault(require("process"));
receipt_components_1.default.registerRenderer(receipt_html_renderer_1.default);
receipt_components_1.default.registerNode(receipt_image_node_1.default);
const MovieReceipt = new receipt_components_1.default('MovieReceipt', {
    render: (props) => {
        const lineItems = (0, util_1.serializeObject)(props.lineItems);
        const trxDateStr = `${props.trxInfo.date.toLocaleString('en-us', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
        })} ${props.trxInfo.date.toLocaleString('en-us', {
            timeStyle: 'short',
            hourCycle: 'h23',
        })}`;
        return `
<receipt>
  <TheaterHeader theaterName="${props.theaterName}" address="${props.address}" city="${props.city}" state="${props.state}" zip="${props.zip}" />
  <LineItemList items="${lineItems}" paymentMethod="CREDIT Card" />
  <img maxWidth=".3" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/1200px-Tux.svg.png" align="center" />
  <TrxInfo trxId="${props.trxInfo.trxId}" dateStr="${trxDateStr}" cashier="${props.trxInfo.cashier}" register="${props.trxInfo.register}" />
  <AdmissionDisclaimer />
  <br />
  <RewardsInfo cardNumberLast4="${props.rewardInfo.cardNumberLast4}" creditsEarned="${props.rewardInfo.creditsEarned}" creditsUsed="${props.rewardInfo.creditsUsed}" creditBalance="${props.rewardInfo.creditBalance}" />
</receipt>
    `;
    },
    components: [
        hr_1.default,
        AdmissionDisclaimer_1.default,
        TheaterHeader_1.default,
        LineItemList_1.default,
        RewardsInfo_1.default,
        TrxInfo_1.default,
    ],
});
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
MovieReceipt.render(receiptData, [], 'html').then((html) => {
    process_1.default.stdout.write(html);
});
