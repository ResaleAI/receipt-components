import { parseREML } from "./parser.js"


export function REMLComponent(template, { name, components, propDefs }) {
  this.template = template
  this.name = name
  this.components = components ?? {}
  this.propDefs = propDefs
  this.slotNode = null
  
  this.nodeTree = parseREML(this)
}

REMLComponent.prototype.renderHTML = function(data = {}) {
  this.checkData(data)

  
}

REMLComponent.prototype.renderPrinterBytes = function(data = {}) {
  this.checkData(data)

  // render node tree and map chars to bytes
  let byteArr = this.nodeTree.renderPrinterBytes(data).map((el) => typeof el === "string" ? el.charCodeAt(0) : el)
  let byteBuff = new Uint8Array(byteArr)

  return byteBuff
}

// ensure propdefs are in the data, throw err if not
REMLComponent.prototype.checkData = function(data) {
  for (let propDef in this.propDefs) {
    if (data[propDef] === undefined) {
      throw new Error(`Missing property '${ propDef }' in passed data`)
    }
  }
}

// let Test = new REMLComponent({
//   name: "TestComponent",
//   components: { OtherComponent },
//   propDefs: ["prop1"] ??
// },
// `<template>
//    <text>{{ prop1 }}</text>
//    <OtherComponent prop="{{ data1 }}" />
// </template>`
//)

