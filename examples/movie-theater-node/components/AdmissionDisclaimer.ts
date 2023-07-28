import ReceiptComponent from '@resaleai/receipt-components';

const AdmissionDisclaimer = new ReceiptComponent('AdmissionDisclaimer', {
  render: () => `
  <align mode="center">
    ***************************
    <br />
    Not valid for admission
    <br />
    ***************************
  </align>`,
});

export default AdmissionDisclaimer;
