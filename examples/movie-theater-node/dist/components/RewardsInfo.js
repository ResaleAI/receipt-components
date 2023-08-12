"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const receipt_components_1 = __importDefault(require("@resaleai/receipt-components"));
const hr_1 = __importDefault(require("./hr"));
const RewardsInfo = new receipt_components_1.default('RewardsInfo', {
    render: (props) => `
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
    Credits used:          ${props.creditsUsed}
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
    `,
    components: [hr_1.default],
});
exports.default = RewardsInfo;
