"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const receipt_components_1 = require("@resaleai/receipt-components");
// todo: convert to raw node?
// const hr = new ReceiptComponent('hr', {
//   render: () => `------------------------------------------`,
// });
function hr() {
    return (0, receipt_components_1.rc)('textLiteral', { text: '------------------------------------------' });
}
exports.default = hr;
