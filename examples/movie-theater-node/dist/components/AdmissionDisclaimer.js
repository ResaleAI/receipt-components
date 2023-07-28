"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const receipt_components_1 = __importDefault(require("@resaleai/receipt-components"));
const AdmissionDisclaimer = new receipt_components_1.default('AdmissionDisclaimer', {
    render: () => `
  <align mode="center">
    ***************************
    <br />
    Not valid for admission
    <br />
    ***************************
  </align>`,
});
exports.default = AdmissionDisclaimer;
