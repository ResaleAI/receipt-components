import ReceiptComponent, { rcFromTemplate } from '@resaleai/receipt-components';

const AdmissionDisclaimer = rcFromTemplate(() => `
  <align mode="center">
    ***************************
    <br />
    Not valid for admission
    <br />
    ***************************
  </align>
`)

export default AdmissionDisclaimer;
