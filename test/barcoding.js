const { ReceiptComponent } = require("../src/component.js")
const fs = require("fs")

let Receipt = new ReceiptComponent({
template: 
`<receipt>
  <text>
      {{test}}
  </text>
  <br />
  <cut />
</receipt>`
})

let byteBuff = (Receipt.renderPrinterBytes({test: "Plato's Closet"}))

console.log(byteBuff)

fs.writeFile("/dev/usb/lp0", byteBuff, (err) => {
  if (err) return console.error(err)
  console.log("wrote to file, should be printing")
})