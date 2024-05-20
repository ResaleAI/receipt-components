"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const receipt_components_1 = require("@resaleai/receipt-components");
function AdmissionDisclaimer(_props) {
    return (0, receipt_components_1.rc)('align', { mode: 'center' }, [
        (0, receipt_components_1.rc)('textLiteral', { text: '***************************' }),
        (0, receipt_components_1.rc)('break'),
        (0, receipt_components_1.rc)('textLiteral', { text: 'Not valid for admission' }),
        (0, receipt_components_1.rc)('break'),
        (0, receipt_components_1.rc)('textLiteral', { text: '***************************' }),
    ]);
}
exports.default = AdmissionDisclaimer;
