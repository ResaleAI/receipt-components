import ReceiptComponent, { rcFromTemplate } from '@resaleai/receipt-components';

interface TheaterHeaderProps {
  theaterName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

const TheaterHeader = rcFromTemplate((props: TheaterHeaderProps) => `
<align mode="center">
  <scale width="2" height="2">
    ${props.theaterName}
  </scale>
  <br />
  <text font="2">
    ${props.address}
    <br />
    ${props.city}, ${props.state} ${props.zip}
  </text>
  <br />
  <inverse>
    SALES RECEIPT
  </inverse>
  <br />
</align>`)

export default TheaterHeader;
