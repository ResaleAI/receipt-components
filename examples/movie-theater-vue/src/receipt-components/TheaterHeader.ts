import ReceiptComponent from '@resaleai/receipt-components';

interface TheaterHeaderProps {
  theaterName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

const TheaterHeader = new ReceiptComponent<TheaterHeaderProps>(
  'TheaterHeader',
  {
    render: (props) => `
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
</align>
    `,
  }
);

export default TheaterHeader;
