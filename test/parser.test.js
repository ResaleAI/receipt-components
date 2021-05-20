const { ReceiptComponent } = require("../src")

describe("template parser", () => {
  it("correctly renders smooth node *RENAME*", () => {
    let Receipt = new ReceiptComponent({
      template: 
      `<receipt>
        <smooth>
          <text>
            <smooth>
              <text scale="1:2">yo</text>
            </smooth>
          </text>
        </smooth>
        <smooth>test</smooth>
      </receipt>`
      })

      let byteBuff = (Receipt.renderPrinterBytes())
      let byteArray = [...byteBuff]

      let correctByteArray = [27, 64, 29, 98, 1, 29, 33, 1, 121, 111, 29, 33, 0, 116, 101, 115, 116, 29, 98, 0]
 
      expect(byteArray).toEqual(correctByteArray)
      
  })

  it("correctly renders text modes (simple)", () => {
    let Receipt = new ReceiptComponent({
      template: 
      `<receipt>
        <mode font="2">
          b
          <mode font="1">
            a
          </mode>
          b
        </mode>
        <mode font="2">b</mode>
      </receipt>`
      })

      let byteBuff = (Receipt.renderPrinterBytes())
      let byteArray = [...byteBuff]

      let correctBytes = [27, 64, 27, 33, 1, 98, 27, 33, 0, 97, 27, 33, 1, 98, 98, 27, 33, 0 ]

      expect(byteArray).toEqual(correctBytes)

  
  })

  it("correctly renders text nodes (complex)", () => {
    let Receipt = new ReceiptComponent({
      template: 
      `<receipt>
        <align mode="center">
          <mode font="2">
            b
            <mode scale="1:2">
              b
              <mode font="1">a</mode>
            </mode>
            <mode font="1">
              a
              <mode font="2">b</mode>
              a
            </mode>
            b
          </mode>
          a
        </align>
      </receipt>`
      })

      let byteBuff = (Receipt.renderPrinterBytes())
      let byteArray = [...byteBuff]

      let correctOutput = [27, 64, 27, 97, 1, 27, 33, 1, 98, 29, 33, 1, 98, 27, 33, 0, 97, 29, 33, 0, 27, 33, 0, 97, 27, 33, 1, 98, 27, 33, 0, 97, 27, 33, 1, 98, 27, 33, 0, 97, 27, 97, 0 ]

      expect(byteArray).toEqual(correctOutput)
  })

  it("correctly renders buy header", () => {
    const BuyHeader = new ReceiptComponent({
      template:
    `<receipt>
        <text bold font="2">
          <text scale="1:2">a</text>
          <text>b</text>
          <text scale="1:2">c</text>
          <text>d</text>
          <text scale="1:2">e</text>
          <break />
        </text>
    </receipt>`,    
    })
    
    let correctOutput = [27, 64, 27, 33, 9, 29, 33, 1, 97, 29, 33, 0, 98, 29, 33, 1, 99, 29, 33, 0, 100, 29, 33, 1, 101, 29, 33, 0, 10, 27, 33, 0]

    let byteBuff = (BuyHeader.renderPrinterBytes())
    let byteArray = [...byteBuff]

    expect(byteArray).toEqual(correctOutput)

  })

  it("correctly renders alt fonts", () => {
    const Receipt = new ReceiptComponent({
      template: `
      <receipt>
        <mode font="2">
          abc
        </mode>
        abc
      </receipt>`
    })

    let correctOutput = [27, 64, 27, 33, 1, 97, 98, 99, 27, 33, 0, 97, 98, 99]

    let byteBuff = (Receipt.renderPrinterBytes())
    let byteArray = [...byteBuff]

    expect(byteArray).toEqual(correctOutput)
  })
})