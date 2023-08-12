"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const receipt_components_1 = __importDefault(require("@resaleai/receipt-components"));
// todo: convert to raw node?
const hr = new receipt_components_1.default('hr', {
    render: () => `------------------------------------------`,
});
exports.default = hr;
