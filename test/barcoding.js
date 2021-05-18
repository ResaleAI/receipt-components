import { EPComponent } from "../src/component.js"
import fs from "fs"

let Receipt = new EPComponent( 
`<receipt>
  <text scale="2:4">
      Yo dawg
  </text>
  <break />
  <barcode data="TEST" />
  <cut />
</receipt>`,
{
  name: "Receipt",

})

let byteBuff = (Receipt.renderPrinterBytes({test: "Plato's Closet"}))

console.log(byteBuff)

fs.writeFile("/dev/usb/lp0", byteBuff, (err) => {
  if (err) return console.error(err)
  console.log("wrote to file, should be printing")
})