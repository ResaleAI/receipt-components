"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const receipt_components_1 = require("@resaleai/receipt-components");
function TheaterHeader(props) {
    return (0, receipt_components_1.rc)('fragment', null, [
        (0, receipt_components_1.rc)('align', { mode: 'center' }, [
            (0, receipt_components_1.rc)('scale', { width: 2, height: 2 }, [
                (0, receipt_components_1.text)(props.theaterName)
            ]),
            (0, receipt_components_1.rc)('break'),
            (0, receipt_components_1.rc)('text', { font: 2 }, [
                (0, receipt_components_1.text)(props.address),
                (0, receipt_components_1.rc)('break'),
                (0, receipt_components_1.text)(`${props.city}, ${props.state} ${props.zip}`),
            ]),
            (0, receipt_components_1.rc)('break'),
            (0, receipt_components_1.rc)('inverse', null, [
                (0, receipt_components_1.text)('SALES RECEIPT')
            ]),
            (0, receipt_components_1.rc)('break'),
        ]),
    ]);
}
exports.default = TheaterHeader;
