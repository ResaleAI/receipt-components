"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const receipt_components_1 = require("@resaleai/receipt-components");
const TheaterHeader = (0, receipt_components_1.rcFromTemplate)((props) => `
<align mode="center">
  <scale width="2" height="2">
    ${props.theaterName}
  </scale>
  <br />
  <text font="2">
    ${props.address}
    <br />
    ${props.city}, ${props.state} ${props.zip}
  </text>
  <br />
  <inverse>
    SALES RECEIPT
  </inverse>
  <br />
</align>`);
exports.default = TheaterHeader;
