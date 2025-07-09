import Commit from "./Commit.js"


var graphOfCommits = {}

var first_id = crypto.randomUUID()

var first_commit = new Commit()

graphOfCommits[first_id] = first_commit

export default graphOfCommits

