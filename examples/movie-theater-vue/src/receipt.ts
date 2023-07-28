import ReceiptComponent from '@resaleai/receipt-components'
import type { LineItem, RewardCreditInfo, TransactionInfo } from './types'
import AdmissionDisclaimer from './receipt-components/AdmissionDisclaimer'
import LineItemList from './receipt-components/LineItemList'
import RewardsInfo from './receipt-components/RewardsInfo'
import hr from './receipt-components/hr'
import { serializeObject } from './util'
import TrxInfo from './receipt-components/TrxInfo'
import TheaterHeader from './receipt-components/TheaterHeader'
// import imagePlugin from '@resaleai/receipt-image-node'
import htmlRenderPlugin from '@resaleai/receipt-html-renderer'

ReceiptComponent.registerRenderer(htmlRenderPlugin)
// ReceiptComponent.registerNode(imagePlugin)

export interface MovieReceiptProps {
  theaterName: string
  address: string
  city: string
  state: string
  zip: string
  lineItems: LineItem[]
  trxInfo: TransactionInfo
  rewardInfo: RewardCreditInfo
}

export const MovieReceipt = new ReceiptComponent<MovieReceiptProps>('MovieReceipt', {
  render: (props) => {
    const lineItems = serializeObject(props.lineItems)
    const trxDateStr = `${props.trxInfo.date.toLocaleString('en-us', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    })} ${props.trxInfo.date.toLocaleString('en-us', {
      timeStyle: 'short',
      hourCycle: 'h23'
    })}`
    return `
<receipt>
  <TheaterHeader theaterName="${props.theaterName}" address="${props.address}" city="${props.city}" state="${props.state}" zip="${props.zip}" />
  <LineItemList items="${lineItems}" paymentMethod="CREDIT Card" />
  <TrxInfo trxId="${props.trxInfo.trxId}" dateStr="${trxDateStr}" cashier="${props.trxInfo.cashier}" register="${props.trxInfo.register}" />
  <AdmissionDisclaimer />
  <br />
  <RewardsInfo cardNumberLast4="${props.rewardInfo.cardNumberLast4}" creditsEarned="${props.rewardInfo.creditsEarned}" creditsUsed="${props.rewardInfo.creditsUsed}" creditBalance="${props.rewardInfo.creditBalance}" />
  </receipt>
  `
  },
  components: [hr, AdmissionDisclaimer, TheaterHeader, LineItemList, RewardsInfo, TrxInfo]
})
// <img maxWidth=".3" src="https://static.vecteezy.com/system/resources/thumbnails/002/258/271/small/template-of-qr-code-ready-to-scan-with-smartphone-illustration-vector.jpg" align="center" />

export const defaultReceiptData: MovieReceiptProps = {
  theaterName: 'Movie Land',
  address: '510 Faker Street',
  city: 'Springfield',
  state: 'ZZ',
  zip: '99999',
  lineItems: [
    {
      name: 'Horror Movie',
      quantity: 1,
      price: 15.99
    },
    {
      name: 'Small Popcorn',
      quantity: 1,
      price: 7.37
    },
    {
      name: 'Small Pepsi',
      quantity: 1,
      price: 5.84
    }
  ],
  trxInfo: {
    trxId: 12345678,
    cashier: 'Zavier',
    register: '1',
    date: new Date()
  },
  rewardInfo: {
    cardNumberLast4: '1234',
    creditsEarned: 1337,
    creditsUsed: 0,
    creditBalance: 2400
  }
}
