"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const receipt_components_1 = __importDefault(require("@resaleai/receipt-components"));
const hr_1 = __importDefault(require("./hr"));
const util_1 = require("../util");
const LineItemListItem = new receipt_components_1.default('LineItemListItem', {
    render: (props) => {
        const item = JSON.parse(props.item);
        const template = `
  <row>
    <col cols="7">
      ${item.name}
    </col>
    <col cols="1" justify="center">
      ${item.quantity}
    </col>
    <col cols="2" justify="right">
      ${item.price.toFixed(2)}
    </col>
  </row>
    `;
        return template;
    },
});
const LineItemList = new receipt_components_1.default('LineItemList', {
    render: (props) => {
        const items = JSON.parse(props.items);
        const subtotal = items.reduce((acc, item) => acc + item.price, 0);
        const tax = subtotal * 0.07;
        const total = subtotal + tax;
        const template = `
<fragment>
  <hr />
  <br />
  <text bold>
    <row>
      <col cols="7">
        Item
      </col>
      <col cols="1" justify="center">
        Qty
      </col>
      <col cols="2" justify="right">
        Price
      </col>
    </row>
  </text>
  <br />
  <hr />
  <row>
    ${items
            .map((item) => `<LineItemListItem item="${(0, util_1.serializeObject)(item)}" /><br />`)
            .join('\n')}
    <col cols="8"></col>
    <col cols="2" justify="right">
      -------
    </col>
    <col cols="5">
    </col>
    <col cols="3">
      Subtotal:
    </col>
    <col cols="2" justify="right">
      ${subtotal.toFixed(2)}
    </col>
    <col cols="5">
    </col>
    <col cols="3">
      TAX:
    </col>
    <col cols="2" justify="right">
      ${tax.toFixed(2)}
    </col>
    <col cols="5">
    </col>
    <col cols="3">
      <scale height="2">
        TOTAL:
      </scale>
    </col>
    <col cols="2" justify="right">
      <scale height="2">
        ${total.toFixed(2)}
      </scale>
    </col>
  </row>
  <br />
  <text bold>
    Payments:
  </text>
  <br />
  <text>   ${props.paymentMethod}  ${total.toFixed(2)}</text>
  <br />
</fragment>
  `;
        return template;
    },
    components: [LineItemListItem, hr_1.default],
});
exports.default = LineItemList;
