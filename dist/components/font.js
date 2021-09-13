"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FontComponent = void 0;
var bytes_builder_1 = require("../bytes_builder");
exports.FontComponent = {
    Render: function (builder, props, children) {
        if (!!children) {
            return builder.ScopedMod(bytes_builder_1.CascadingBytesBuilder.bytes.ESC, 'M', props.type, children);
        }
        return builder.GlobalMod(bytes_builder_1.CascadingBytesBuilder.bytes.ESC, 'M', props.type);
    },
};
exports.default = exports.FontComponent;
