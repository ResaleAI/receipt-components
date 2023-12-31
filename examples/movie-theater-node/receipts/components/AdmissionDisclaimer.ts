import rcFromTemplate from '@resaleai/rc-xml';

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
