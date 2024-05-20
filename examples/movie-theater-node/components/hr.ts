import { rc } from '@resaleai/receipt-components';

// todo: convert to raw node?
// const hr = new ReceiptComponent('hr', {
//   render: () => `------------------------------------------`,
// });
function hr() {
  return rc('textLiteral', { text: '------------------------------------------' });
}


export default hr;
