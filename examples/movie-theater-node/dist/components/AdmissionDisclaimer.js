"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const receipt_components_1 = require("@resaleai/receipt-components");
const AdmissionDisclaimer = (0, receipt_components_1.rcFromTemplate)(() => `
  <align mode="center">
    ***************************
    <br />
    Not valid for admission
    <br />
    ***************************
  </align>
`);
exports.default = AdmissionDisclaimer;
