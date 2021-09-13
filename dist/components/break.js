"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BreakComponent = void 0;
var bytes_builder_1 = require("../bytes_builder");
exports.BreakComponent = {
    Render: function (builder, props) {
        if (!props.lines) {
            return builder.RawBytes(bytes_builder_1.CascadingBytesBuilder.bytes.LF);
        }
        return builder.RawBytes(bytes_builder_1.CascadingBytesBuilder.bytes.ESC, 'd', props.lines);
    },
};
exports.default = exports.BreakComponent;
