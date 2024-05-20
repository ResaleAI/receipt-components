import ReceiptComponent, { rc, text } from '@resaleai/receipt-components';

interface TheaterHeaderProps {
  theaterName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

function TheaterHeader(props: TheaterHeaderProps) {
  return rc('fragment', null, [
    rc('align', { mode: 'center' }, [
      rc('scale', { width: 2, height: 2 }, [
        text(props.theaterName)
      ]),
      rc('break'),
      rc('text', { font: 2 }, [
        text(props.address),
        rc('break'),
        text(`${props.city}, ${props.state} ${props.zip}`),
      ]),
      rc('break'),
      rc('inverse', null, [
        text('SALES RECEIPT')
      ]),
      rc('break'),
    ]),
  ]);
}

export default TheaterHeader;
