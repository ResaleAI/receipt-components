const { EPComponent } = require("../src/component.js")
const fs = require("fs")

let Receipt = new EPComponent(
`<receipt>
  <img testCircle src="https://lh3.googleusercontent.com/proxy/7E9QXAnHhViGNgQMJ_21iFwIfONLp5nuQaaYFmWe-FVun4rhM1fIePF8xaijGQ9OlhXuoO8mdA-FKhvhunXNK7Yg" />
</receipt>`,
{
  name: "Receipt",

})

let byteBuff = (Receipt.renderPrinterBytes({test: "Plato's Closet"}))

fs.writeFile("/dev/usb/lp0", byteBuff, (err) => {
  if (err) return console.log(err)
  return console.log("wrote to file, should be printing")
})