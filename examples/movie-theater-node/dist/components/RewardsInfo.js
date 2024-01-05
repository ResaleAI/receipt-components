"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const receipt_components_1 = require("@resaleai/receipt-components");
const hr_1 = __importDefault(require("./hr"));
function RewardsInfo(props) {
    return (0, receipt_components_1.rc)('fragment', null, [
        (0, hr_1.default)(),
        (0, receipt_components_1.rc)('align', { mode: 'center' }, [
            (0, receipt_components_1.rc)('scale', { width: 2, height: 2 }, [
                (0, receipt_components_1.text)('MOVIE REWARDS'),
            ]),
            (0, receipt_components_1.rc)('break'),
            (0, receipt_components_1.text)(`Card No.: **********${props.cardNumberLast4}`),
            (0, receipt_components_1.rc)('break'),
            (0, receipt_components_1.text)(`Credits earned:     ${props.creditsEarned}`),
            (0, receipt_components_1.rc)('break'),
            (0, receipt_components_1.text)(`Credits used:          ${props.creditsUsed}`),
            (0, receipt_components_1.rc)('break'),
            (0, receipt_components_1.rc)('inverse', null, [
                (0, receipt_components_1.text)(`Credit Balance:     ${props.creditBalance}`),
            ]),
            (0, receipt_components_1.rc)('break'),
            (0, receipt_components_1.rc)('scale', { height: 2 }, [
                (0, receipt_components_1.text)('Register or choose rewards at MyReward.com'),
            ]),
        ]),
    ]);
}
exports.default = RewardsInfo;
