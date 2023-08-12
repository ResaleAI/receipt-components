"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const receipt_components_1 = __importDefault(require("@resaleai/receipt-components"));
const TheaterHeader = new receipt_components_1.default('TheaterHeader', {
    render: (props) => `
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
</align>
    `,
});
exports.default = TheaterHeader;
