import ReceiptComponent, {
  rc,
  render,
  text,
} from '@resaleai/receipt-components';
import { LineItem, RewardCreditInfo, TransactionInfo } from './types';
import AdmissionDisclaimer from './components/AdmissionDisclaimer';
// import LineItemList from './components/LineItemList';
import RewardsInfo from './components/RewardsInfo';
// import hr from './components/hr';
import { serializeObject } from './util';
// import TrxInfo from './components/TrxInfo';
import TheaterHeader from './components/TheaterHeader';
import imagePlugin from '@resaleai/receipt-image-node';
import htmlRenderPlugin from '@resaleai/receipt-html-renderer';
import process from 'process';
import layoutPlugin from '@resaleai/receipt-layout';

ReceiptComponent.use(imagePlugin).use(layoutPlugin).use(htmlRenderPlugin);

interface MovieReceiptProps {
  theaterName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  lineItems: LineItem[];
  trxInfo: TransactionInfo;
  rewardInfo: RewardCreditInfo;
}
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

function MovieReceipt(props: MovieReceiptProps) {
  const lineItems = serializeObject(props.lineItems);
  const trxDateStr = `${props.trxInfo.date.toLocaleString('en-us', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  })} ${props.trxInfo.date.toLocaleString('en-us', {
    timeStyle: 'short',
    hourCycle: 'h23',
  })}`;

  return rc('receipt', null, [
    TheaterHeader({
      theaterName: props.theaterName,
      address: props.address,
      city: props.city,
      state: props.state,
      zip: props.zip,
    }),
    rc('image', {
      maxWidth: 0.3,
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/1200px-Tux.svg.png',
      align: 'center',
    }),
    AdmissionDisclaimer(null, [
      rc('textLiteral', { text: 'Have a great day!' }),
    ]),
    ...props.lineItems.map((li) => {
      return rc('text', {}, [
        text(`${li.name} (x${li.quantity}): ${li.price}`),
      ]);
    }),
    RewardsInfo({
      cardNumberLast4: props.rewardInfo.cardNumberLast4,
      creditsEarned: props.rewardInfo.creditsEarned,
      creditsUsed: props.rewardInfo.creditsUsed,
      creditBalance: props.rewardInfo.creditBalance,
    }),
  ]);
}

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

render(MovieReceipt, 'html', receiptData).then((html) => {
  process.stdout.write(html);
});
