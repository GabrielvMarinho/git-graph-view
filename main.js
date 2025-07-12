import ObjectModel from "./Classes/ObjectModel.js"

var commitGraph = new ObjectModel()
// console.log(commitGraph.getCurrentState())
commitGraph.createCommit("new commit")
// console.log(commitGraph.getCurrentState())
commitGraph.createBranch("dev")
// console.log(commitGraph.getCurrentState())

// var commit = Object.keys(commitGraph.getCurrentState().graph)[0]
// console.log(commit)
commitGraph.moveHead("master")

// console.log(commitGraph.getCurrentState())

commitGraph.createCommit("third commit")

console.log(JSON.stringify(commitGraph.getCurrentState(), null, 2))

