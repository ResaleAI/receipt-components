"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const receipt_components_1 = require("@resaleai/receipt-components");
const TrxInfo = (0, receipt_components_1.rcFromTemplate)((props) => `
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
</fragment>`);
exports.default = TrxInfo;
