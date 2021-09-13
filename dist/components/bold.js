"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoldComponent = void 0;
var bytes_builder_1 = require("../bytes_builder");
exports.BoldComponent = {
    Render: function (builder, props, children) {
        return builder.ScopedMod(bytes_builder_1.CascadingBytesBuilder.bytes.ESC, 'E', 1, children);
    }
};
exports.default = exports.BoldComponent;
