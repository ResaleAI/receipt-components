"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeObject = void 0;
const serializeObject = (obj) => {
    return JSON.stringify(obj).replace(/"/g, '&quot;');
};
exports.serializeObject = serializeObject;
