"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globals = void 0;
var align_1 = __importDefault(require("./align"));
var bold_1 = __importDefault(require("./bold"));
var break_1 = __importDefault(require("./break"));
var font_1 = __importDefault(require("./font"));
var scale_1 = __importDefault(require("./scale"));
var smooth_1 = __importDefault(require("./smooth"));
exports.globals = {
    AlignComponent: align_1.default,
    BoldComponent: bold_1.default,
    BreakComponent: break_1.default,
    FontComponent: font_1.default,
    ScaleComponent: scale_1.default,
    SmoothComponent: smooth_1.default,
};
exports.default = exports.globals;
