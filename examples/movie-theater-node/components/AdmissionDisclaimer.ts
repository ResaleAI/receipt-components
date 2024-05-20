import { rc } from '@resaleai/receipt-components';

function AdmissionDisclaimer(_props: null) {
  return rc('align', { mode: 'center' }, [
    rc('textLiteral', { text: '***************************' }),
    rc('break'),
    rc('textLiteral', { text: 'Not valid for admission' }),
    rc('break'),
    rc('textLiteral', { text: '***************************' }),
  ])
}

export default AdmissionDisclaimer;
