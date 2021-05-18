// import { parseMarkup } from "./parser.js"
const { parseMarkup } = require("./parser.js")


const EPComponent = function(template, { name, components, propDefs }) {
  this.template = template
  this.name = name
  this.components = components ?? {}
  this.propDefs = propDefs
  this.slotNode = null
  
  
  // replace {{}} with var from data
  // let filledContent = this.template.replace(/{{\s*([\w]+)\s*}}/g, function(_, varName) {
  //   return `${data[varName]}` 
  // })

  this.nodeTree = parseMarkup(this)
}

EPComponent.prototype.renderHTML = function(data = {}) {
  // this.checkData(data)

  
}

EPComponent.prototype.renderPrinterBytes = function(data = {}) {
  // this.checkData(data)

  // render node tree and map chars to bytes
  let byteArr = this.nodeTree.renderPrinterBytes(data).map((el) => typeof el === "string" ? (el.charCodeAt(0)) : el)
  let byteBuff = new Uint8Array(byteArr)

  return byteBuff
}

// ensure propdefs are in the data, throw err if not
EPComponent.prototype.checkData = function(data) {
  for (let propDef in this.propDefs) {
    if (data[propDef] === undefined) {
      throw new Error(`Missing property '${ propDef }' in passed data`)
    }
  }
}

// let Test = new EPComponent({
//   name: "TestComponent",
//   components: { OtherComponent },
//   propDefs: ["prop1"] ??
// },
// `<template>
//    <text>{{ prop1 }}</text>
//    <OtherComponent prop="{{ data1 }}" />
// </template>`
//)

exports.EPComponent = EPComponent