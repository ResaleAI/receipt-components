import { ReceiptComponent } from '../src';

const Receipt = new ReceiptComponent({
  template: `
      <receipt>
        <img src="https://logos-download.com/wp-content/uploads/2016/02/YouTube_logo.png" />
        <break lines="3" />
        <cut />
      </receipt>`,
});

Receipt.parseTemplate().then(() => {
  console.log(Receipt.renderPrinterBytes());
});
