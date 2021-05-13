import { REMLComponent } from "./component.js"
import fs from "fs"

let BigText = new REMLComponent(
`<template>
  <text scale="5:5">
    <slot />
  </text>
</template>`,

{
  name: "BigText",
  propDefs: {
    test: "test"
  }
})

let Receipt = new REMLComponent(
`<receipt>
  <BigText>
    123
  </BigText>
  <break lines="7" />
  <cut />
</receipt>`,
{
  name: "Receipt",
  components: {
    BigText
  }

})

let byteBuff = (Receipt.renderPrinterBytes())

fs.writeFile("/dev/usb/lp0", byteBuff, (err) => {
  if (err) return console.log(err)
  return console.log("wrote to file, should be printing")
})