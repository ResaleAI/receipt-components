"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlignComponent = exports.AlignMode = void 0;
var bytes_builder_1 = require("../bytes_builder");
var AlignMode;
(function (AlignMode) {
    AlignMode[AlignMode["LEFT"] = 0] = "LEFT";
    AlignMode[AlignMode["CENTER"] = 1] = "CENTER";
    AlignMode[AlignMode["RIGHT"] = 2] = "RIGHT";
})(AlignMode = exports.AlignMode || (exports.AlignMode = {}));
exports.AlignComponent = {
    Render: function (builder, props, children) {
        if (!!children) {
            return builder.ScopedMod(bytes_builder_1.CascadingBytesBuilder.bytes.ESC, 'a', props.mode, children);
        }
        return builder.GlobalMod(bytes_builder_1.CascadingBytesBuilder.bytes.ESC, 'a', props.mode);
    },
};
exports.default = exports.AlignComponent;
