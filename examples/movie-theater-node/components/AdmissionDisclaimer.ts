import { ReceiptAST, rc } from '@resaleai/receipt-components';

function AdmissionDisclaimer(_props: null, children: ReceiptAST[] = []) {
  return rc('align', { mode: 'center' }, [
    rc('textLiteral', { text: '***************************' }),
    rc('break'),
    rc('textLiteral', { text: 'Not valid for admission' }),
    rc('break'),
    rc('textLiteral', { text: '***************************' }),
    rc('break'),
    ...children,
  ]);
}

export default AdmissionDisclaimer;
