const { EPComponent } = require("../src/component.js")
const fs = require("fs")

let Receipt = new EPComponent(
`<receipt>
  <text scale="1:1">
    {{content}}
  </text>
  <break lines="3" />
  <text scale="2:1">
    {{content}}
  </text>
  <break lines="3" />
  <text scale="3:1">
    {{content}}
  </text>
  <break lines="3" />
  <text scale="4:1">
    {{content}}
  </text>
  <cut />
</receipt>`,
{
  name: "Receipt",
})

let byteBuff = (Receipt.renderPrinterBytes({content: "Testing testing line length testing. this is some long line text, please wrap at words and dont cut off characters"}))

fs.writeFile("/dev/usb/lp0", byteBuff, (err) => {
  if (err) return console.log(err)
  return console.log("wrote to file, should be printing")
})

console.log(byteBuff)