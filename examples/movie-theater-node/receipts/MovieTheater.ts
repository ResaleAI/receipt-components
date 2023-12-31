import { rc } from "@resaleai/receipt-components";
import { LineItem, TransactionInfo, RewardCreditInfo } from "../types";
import { serializeObject } from "../util";
import AdmissionDisclaimer from "./components/AdmissionDisclaimer";
import RewardsInfo from "./components/RewardsInfo";
import TheaterHeader from "./components/TheaterHeader";

export interface MovieReceiptProps {
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

export default function MovieReceipt(props: MovieReceiptProps) {
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
    TheaterHeader({ theaterName: props.theaterName, address: props.address, city: props.city, state: props.state, zip: props.zip }),
    rc('image', { maxWidth: .3, src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/1200px-Tux.svg.png', align: 'center' }),
    AdmissionDisclaimer(null),
    rc('break'),
    RewardsInfo({ cardNumberLast4: props.rewardInfo.cardNumberLast4, creditsEarned: props.rewardInfo.creditsEarned, creditsUsed: props.rewardInfo.creditsUsed, creditBalance: props.rewardInfo.creditBalance }),
  ]);
}
