import ReceiptComponent, { rcFromTemplate } from '@resaleai/receipt-components';

interface TrxInfoProps {
  trxId: number;
  cashier: string;
  register: string;
  dateStr: string;
}

const TrxInfo = rcFromTemplate((props: TrxInfoProps) => `
<fragment>
  <row>
    <col cols="6">
      Trans #: ${props.trxId}
    </col>
    <col cols="4">
      ${props.dateStr}
    </col>
  </row>
  <br />
  <row>
    <col cols="6">
      Cashier: ${props.cashier}
    </col>
    <col cols="4">
      Register: No${props.register}
    </col>
  </row>
</fragment>`)

export default TrxInfo;
