"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
var bytes_builder_1 = require("./bytes_builder");
var supportedPrinters = {
    TMT88IV: {
        docWidth: 10,
        docWidthAlt: 20,
    },
    TMT88V: {
        docWidth: 20,
        docWidthAlt: 43,
    },
};
var Receipt = /** @class */ (function () {
    function Receipt(root, printer) {
        var _a;
        this.root = root;
        this.printer = (_a = supportedPrinters[printer]) !== null && _a !== void 0 ? _a : 'TMT88IV';
        this.builder = new bytes_builder_1.CascadingBytesBuilder({
            lineLength: [this.printer.docWidth],
            lineLengthAlt: [this.printer.docWidthAlt],
        });
    }
    Receipt.prototype.Print = function (props) {
        var retVal = new Uint8Array(__spreadArray(__spreadArray(__spreadArray([], this.builder.RawBytes(bytes_builder_1.CascadingBytesBuilder.bytes.ESC, '@')), this.root.Render(this.builder, props)), this.builder.RawBytes(bytes_builder_1.CascadingBytesBuilder.bytes.LF, bytes_builder_1.CascadingBytesBuilder.bytes.GS, 'V', 'A', 3)));
        return retVal;
    };
    return Receipt;
}());
exports.default = Receipt;
