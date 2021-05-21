import {ReceiptComponent} from '../src/component.js';
import fs from 'fs';

const Receipt = new ReceiptComponent({
  template:
`<receipt>
  <mode font="2">
    this is some alt font text
  </mode>
  <cut />
</receipt>`,
});

const byteBuff = Receipt.renderPrinterBytes();

console.log(byteBuff);

fs.writeFile('/dev/usb/lp0', byteBuff, (err) => {
  if (err) return console.error(err);
  console.log('wrote to file, should be printing');
});
