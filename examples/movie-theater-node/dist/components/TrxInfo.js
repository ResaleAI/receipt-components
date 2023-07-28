"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const receipt_components_1 = __importDefault(require("@resaleai/receipt-components"));
const TrxInfo = new receipt_components_1.default('TrxInfo', {
    render: (props) => `
<fragment>
  <row>
    <col cols="6">
      Trans #: ${props.trxId}
    </col>
    <col cols="4">
      ${props.dateStr}
    </col>
  </row>
  <br />
  <row>
    <col cols="6">
      Cashier: ${props.cashier}
    </col>
    <col cols="4">
      Register: No${props.register}
    </col>
  </row>
</fragment>`,
});
exports.default = TrxInfo;
