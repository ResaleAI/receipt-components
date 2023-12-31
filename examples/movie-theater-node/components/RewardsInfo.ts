import ReceiptComponent, { rcFromTemplate } from '@resaleai/receipt-components';
import hr from './hr';

interface RewardsInfoProps {
  cardNumberLast4: string;
  creditsEarned: number;
  creditsUsed: number;
  creditBalance: number;
}

const RewardsInfo = rcFromTemplate((props: RewardsInfoProps) => `
<fragment>
  <hr />
  <align mode="center">
    <scale width="2" height="2">
      MOVIE REWARDS
    </scale>
    <br />
    Card No.: **********${props.cardNumberLast4}
    <br />
    Credits earned:     ${props.creditsEarned}
    <br />
    Credits used:       ${props.creditsUsed}
    <br />
    <inverse>
    Credit Balance:     ${props.creditBalance}
    </inverse>
    <br />
    <scale height="2">
      Register or choose rewards at MyReward.com
    </scale>
  </align>
</fragment>
`, {
  components: {
    hr
  },
})

export default RewardsInfo;
