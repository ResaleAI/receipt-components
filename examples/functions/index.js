"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = __importDefault(require("process"));
const receiptComponent_1 = require("@resaleai/receipt-components/dist/receiptComponent");
const escpos_1 = require("@resaleai/receipt-components/dist/renderer/renderers/escpos");
const util_1 = require("@resaleai/receipt-components/dist/renderer/renderers/escpos/util");
const testnode = (props, children) => {
    return {
        name: 'inverse',
        props,
        children,
    };
};
(0, escpos_1.registerEscPosRenderer)('inverse', (_props, children) => __awaiter(void 0, void 0, void 0, function* () {
    return [
        util_1.bytes.GS,
        (0, util_1.charToByte)('B'),
        1,
        ...(yield (0, util_1.renderChildBytes)(children)),
        util_1.bytes.GS,
        (0, util_1.charToByte)('B'),
        0,
    ];
}));
const hr = new receiptComponent_1.ReceiptComponent('hr', {
    template: `------------------------------------------`,
});
const TestReceipt = new receiptComponent_1.ReceiptComponent('TestReceipt', {
    template: `
<receipt>
  <align mode="center">
    <scale width="2" height="2">
      Riviera 8
    </scale>
    <br />
    <text font="2">
      510 South Gay Street
      <br />
      Knoxville, TN 37902
      <br />
    </text>
    <inverse>
      SALES RECEIPT
    </inverse>
  </align>
  <br />
  <hr />
  <br />
  <text bold>Item                          Qty   Price </text>
  <br />
  <hr />
  <br />
  test
  <br lines="5" />
</receipt>
    `,
    nodes: {
        inverse: testnode,
    },
    components: [hr],
});
TestReceipt.render({}, [], 'escpos').then((res) => {
    // console.log(res);
    process_1.default.stdout.write(Buffer.from(res));
});
