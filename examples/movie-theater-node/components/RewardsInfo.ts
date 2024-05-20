import { rc, text } from '@resaleai/receipt-components';
import hr from './hr';

interface RewardsInfoProps {
  cardNumberLast4: string;
  creditsEarned: number;
  creditsUsed: number;
  creditBalance: number;
}

function RewardsInfo(props: RewardsInfoProps) {
  return rc('fragment', null, [
    hr(),
    rc('align', { mode: 'center' }, [
      rc('scale', { width: 2, height: 2 }, [
        text('MOVIE REWARDS'),
      ]),
      rc('break'),
      text(`Card No.: **********${props.cardNumberLast4}`),
      rc('break'),
      text(`Credits earned:     ${props.creditsEarned}`),
      rc('break'),
      text(`Credits used:          ${props.creditsUsed}`),
      rc('break'),
      rc('inverse', null, [
        text(`Credit Balance:     ${props.creditBalance}`),
      ]),
      rc('break'),
      rc('scale', { height: 2 }, [
        text('Register or choose rewards at MyReward.com'),
      ]),

    ]),
  ]);
}

export default RewardsInfo;
