// runtime parse a string with braces and fill it with
// the given data.
// REGEX ONLY FINDS WORDS, DONT USE WEIRD NAMES
module.exports = function(bracefulStr, data) {
  // regex desc:
//    - find { char = \{
  //    - find 0 or more spaces = \s*
  //    - capture the word inside 1 or longer = (\w+)
  //    - find 0 or more spaces again = \s*
  //    - finally find closing char = \}
  //    - the g makes it "greedy" and find all 
  let filledContent = bracefulStr.replace(/\{{2,}\s*(\w+)\s*\}{2,}/g, function(_, varName) {
    // varName is the first capture group match
    // ($1 in regex)
    
    // replace the braces part with whatever data wants to be rendered
    return `${data[varName]}` 
  })
  
  // return the filled out content
  return filledContent
}