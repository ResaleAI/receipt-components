import ReceiptComponent, { rc, text } from '@resaleai/receipt-components';

interface TrxInfoProps {
  trxId: number;
  cashier: string;
  register: string;
  dateStr: string;
}

// const TrxInfo = new ReceiptComponent<TrxInfoProps>('TrxInfo', {
//   render: (props) => `
// <fragment>
//   <row>
//     <col cols="6">
//       Trans #: ${props.trxId}
//     </col>
//     <col cols="4">
//       ${props.dateStr}
//     </col>
//   </row>
//   <br />
//   <row>
//     <col cols="6">
//       Cashier: ${props.cashier}
//     </col>
//     <col cols="4">
//       Register: No${props.register}
//     </col>
//   </row>
// </fragment>`,
// });

// function TrxInfo(props: TrxInfoProps) {
//   return rc('fragment', null, [
//     rc('row', null, [
//       rc('col', { cols: 6 }, [
//         `Trans #: ${props.trxId}`
//       ]),
//       rc('col', { cols: 4 }, [
//         props.dateStr
//       ]),
//     ]),
//     rc('break'),
//     rc('row', null, [
//       rc('col', { cols: 6 }, [
//         text(`Cashier: ${props.cashier}`)
//       ]),
//       rc('col', { cols: 4 }, [

//       ]),
//     ]),
//   ]);
// }
// export default TrxInfo;
