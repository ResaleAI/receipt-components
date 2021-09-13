"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __importDefault(require("."));
var TestComponent = {
    Render: function (builder, props) {
        return builder.RenderComponent('AlignComponent', { mode: 1 }, function (builder) {
            return builder.RenderComponent('BoldComponent', {}, function (builder) {
                return builder.RawBytes(props.text);
            });
        });
    },
};
var FontTest = {
    Render: function (builder, props) {
        return __spreadArray(__spreadArray(__spreadArray([], builder.RenderComponent('FontComponent', { type: 1 }, function (builder) { return __spreadArray(__spreadArray(__spreadArray([], builder.RawBytes('b')), builder.RenderComponent('FontComponent', { type: 0 }, function (builder) {
            return builder.RawBytes('a');
        })), builder.RawBytes('b')); })), builder.RawBytes('a')), builder.RenderComponent('FontComponent', { type: 1 }, function (builder) {
            return builder.RawBytes('b');
        }));
    },
};
var TestReceipt = new _1.default(FontTest, 'TMT88IV');
console.log(TestReceipt.Print({ text: 'Hello World!' }));
