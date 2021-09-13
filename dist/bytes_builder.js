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
exports.CascadingBytesBuilder = void 0;
var components_1 = __importDefault(require("./components"));
var CascadingBytesBuilder = /** @class */ (function () {
    function CascadingBytesBuilder(defaultMods) {
        this.modificationStack = defaultMods;
        this.globalComponents = components_1.default;
    }
    CascadingBytesBuilder.prototype.RawBytes = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var retVal = [];
        for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
            var data = args_1[_a];
            switch (typeof data) {
                case 'string':
                    for (var i = 0; i < data.length; i++) {
                        if (data.charCodeAt(i) !== 0) {
                            retVal.push(data.charCodeAt(i));
                        }
                    }
                    break;
                case 'number':
                    retVal.push(data);
                    break;
            }
        }
        return retVal;
    };
    CascadingBytesBuilder.prototype.GlobalMod = function (code, key, val) {
        this.modificationStack[key] = [val];
        return this.RawBytes(code, key, val);
    };
    CascadingBytesBuilder.prototype.ScopedMod = function (code, key, val, children) {
        var _a;
        if (!this.modificationStack[key]) {
            // assuming default for everything is 0, may be wrong...
            this.modificationStack[key] = [val];
        }
        else if (this.modificationStack[key][this.modificationStack[key].length - 1] == val) {
            return children(this);
        }
        else {
            this.modificationStack[key].push(val);
        }
        var top = this.modificationStack[key][this.modificationStack[key].length - 1];
        var retVal = [code, key.charCodeAt(0), top];
        retVal.push.apply(retVal, children(this));
        this.modificationStack[key].pop();
        // return and set value back to prev state;
        return __spreadArray(__spreadArray([], retVal), [
            code,
            key.charCodeAt(0),
            (_a = this.modificationStack[key][this.modificationStack[key].length - 1]) !== null && _a !== void 0 ? _a : 0,
        ]);
    };
    CascadingBytesBuilder.prototype.RenderComponent = function (component, props, children) {
        if (typeof component == 'string') {
            if (!components_1.default[component])
                throw 'Undefined component';
            return components_1.default[component].Render(this, props, children);
        }
        return component.Render(this, props, children);
    };
    CascadingBytesBuilder.bytes = {
        ESC: 0x1b,
        LF: 0x0a,
        NUL: 0,
        GS: 0x1d,
    };
    return CascadingBytesBuilder;
}());
exports.CascadingBytesBuilder = CascadingBytesBuilder;
