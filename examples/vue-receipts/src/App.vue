<script>
import { ReceiptComponent } from "@resaleai/receipt-components";


const cookies = [
  {
    uuid: "cc20210701",
    name: "Chocolate chip",
    price: 2.99,
  },
  {
    uuid: "sd20210606",
    name: "Snickerdoodle",
    price: 3.99
  },
  {
    uuid: "gb20201225",
    name: "Gingerbread",
    price: 3.49
  }
]

const OrderReceipt = new ReceiptComponent({
  template: `<receipt>
  <align mode="center">
    <text bold>{{ storeName }}</text>
  </align>
  <br lines="2"/>
  <text font="2">Order details for {{ customer }}</text>
</receipt>`,
});

export default {
  name: 'App',
  components: {
  },
  data: () => ({
    errors: [],
    selected: {
      uuid: null,
      qty: 0
    },
    receiptData: {
      customerName: "",
      orderCookies: [],
    }
  }),
  async created() {

    // parse the template
    await OrderReceipt.parseTemplate()
    this.OrderReceipt = OrderReceipt

  //   let bytes = OrderReceipt.renderPrinterBytes({
  //   name: 'Zavier Miller',
  //   transId: '423431',
  //   code: 'RAI65433657',
  //   phone: '(615) 521-1181',
  //   desc: 'buncha super dope stuff',
  //   buyDate: '05/17/21',
  //   buyTime: '11:59AM',
  //   buyHandler: 'ZJM',
  //   buyNum: '119',
  //   offerAmt: 121.29,
  //   itemAmt: 26,
  //   takeReasons: '\tHot teen brands\n\n\tHigh demand items\n\n\tCool details\n',
  //   passReasons: '\tNon teen styles\n\n\tNon casual styles\n\n\tolder styles\n',
  //   line: 'ÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ',
  //   font2Line: 'ÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ',
  // });

  // let htmlString = OrderReceipt
  },
  computed: {
    cookies() {
      return cookies;
    },
    selectedCost() {
      return cookies.find((cookie) => { return cookie.uuid === this.selected.uuid }).price * this.selected.qty
    }
  },
  methods: {
    addCookieToOrder(e) {
      e.preventDefault(); //dont refresh!
      
      // quick error checking
      if (this.selected.qty < 1) this.errors.push('Must select at least one cookie')
      if (cookies.findIndex((c) => ( c.uuid === this.selected.uuid)) === -1) this.errors.push('Invalid cookie')
      if (this.errors.length > 0) return

      // add cookie to order
      this.receiptData.orderCookies.push({ uuid: this.selected.uuid, qty: this.selected.qty, cost: this.selectedCost, name: cookies.find(c => ( c.uuid === this.selected.uuid )).name })
      this.selected = {
        uuid: null,
        qty: 0
      }
    },

    generateReceipt(e) {
      e.preventDefault();

      this.validateInputs();
      if (this.errors.length > 0) return;

      const rightSide = document.getElementsByClassName('right-side')[0]

      rightSide.innerHTML = (this.OrderReceipt.renderHTML({storeName: "Test Store", customer: this.receiptData.customerName}))
      // console.log(this.OrderReceipt.renderPrinterBytes({storeName: "Test Store"}))
    },

    // returns an array containing
    // any errors found
    validateInputs() {
      if (this.receiptData.customerName === "") this.errors.push("Receipt must have customer name")
      if (this.receiptData.orderCookies.length < 1) this.errors.push("Receipt must have at least 1 cookie order")

      this.receiptData.orderCookies.forEach((cookie, i) => { if (cookie.qty < 1) this.receiptData.orderCookies.splice(i, 1)  })
    }
  }
}
</script>

<template>
  <div id="app">
    <div class="left-side">
      <h1>reciept-component / Vue demo</h1>
      <form class="data-form">
        <p v-if="errors.length" style="color: red;">
          <b>Please correct the following error(s):</b>
          <ul>
            <li v-for="error in errors" :key="error.content">{{error}}</li>
          </ul>
        </p>
        <input type="text" v-model="receiptData.customerName" placeholder="Customer name" />
        <span v-for="cookie in receiptData.orderCookies" :key="cookie.uuid">
          <select v-model="cookie.uuid" style="width: 185px;">
            <option v-for="cookie in cookies" :key="cookie.uuid" :value="cookie.uuid">
              {{ `${cookie.name}` }}
            </option>
          </select>
          <input type="number" v-model="cookie.qty" :min="1" style="width: 50px; display: inline; margin: 0 20px;">
        </span>
        <span>
          <select v-model="selected.uuid" style="width: 185px;">
            <option v-for="cookie in cookies" :key="cookie.uuid" :value="cookie.uuid">
              {{ `${cookie.name}` }}
            </option>
          </select>
          <input type="number" v-model="selected.qty" min="1" style="width: 50px; display: inline; margin: 0 20px;">
          <button @click="addCookieToOrder" :disabled="!selected.uuid || selected.qty < 0">Add cookie</button>
        </span>
        <button @click="generateReceipt">Generate receipt</button>
      </form>
      <div class="order-info">
        <h2>Current order details</h2>
        <h4>
          Customer: <b>{{ receiptData.customerName }}</b>
        </h4>
        <h4>
          Cookies:
          <ul style="display: inline;">
            <li v-for="cookie in receiptData.orderCookies" :key="cookie.uuid" style="font-weight: bold; margin-left: 20px; list-style-type: none;">{{ `${cookie.qty} ${cookie.name}${ cookie.qty == 1 ? '' : 's'}` }}</li>
          </ul>
        </h4>
        <h4>
          Subtotal: <b>${{ receiptData.orderCookies.reduce((agg, cookie) => ( agg += cookie.cost ), 0).toFixed(2) }}</b>
        </h4>
      </div>
    </div>
    <div class="right-side">
      <p>Working...</p>
    </div>
  </div>
</template>

<style>
#app, body, html {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  height: 80vh;
}
h4 {
  font-weight: 500;
  font-size: 18px;
}
.left-side, .right-side {
  width: 48vw;
  position: absolute;
  padding: 20px;
  margin: none;
}
.right-side {
  right: 0;
}
.left-side {
  left: 0;
}
.data-form > * {
  display: block;
  margin-bottom: 20px;
}
.order-info {
  margin-top: 50px;
}
</style>
