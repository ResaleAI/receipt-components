"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScaleComponent = void 0;
var bytes_builder_1 = require("../bytes_builder");
exports.ScaleComponent = {
    Render: function (builder, props, children) {
        var scaleByte = (props.x << 4) | props.y;
        if (!!children) {
            return builder.ScopedMod(bytes_builder_1.CascadingBytesBuilder.bytes.GS, '!', scaleByte, children);
        }
        return builder.GlobalMod(bytes_builder_1.CascadingBytesBuilder.bytes.GS, '!', scaleByte);
    },
};
exports.default = exports.ScaleComponent;
