"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmoothComponent = void 0;
var bytes_builder_1 = require("../bytes_builder");
exports.SmoothComponent = {
    Render: function (builder, props, children) {
        if (!!children) {
            return builder.ScopedMod(bytes_builder_1.CascadingBytesBuilder.bytes.GS, 'b', 1, children);
        }
        return builder.GlobalMod(bytes_builder_1.CascadingBytesBuilder.bytes.GS, 'b', 1);
    },
};
exports.default = exports.SmoothComponent;
