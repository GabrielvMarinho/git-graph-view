import GitObject from "../GitObjectStructure/GitObject"
import CommandDispatcher from "../Input/CommandDispatcher"

test("is an ancestor of commit", ()=>{
    const gitObject = new GitObject()
    const cmdDisp = new CommandDispatcher(gitObject)
    const firstSha = gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand("git commit")
    expect(
        gitObject.isSpecificCommitAnAncestorOfCurrentCommit(firstSha)
    ).toBe(true)
    
    
})