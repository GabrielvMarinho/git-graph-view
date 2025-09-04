import GitObject from "../GitObjectStructure/GitObject"
import CommandDispatcher from "../Input/CommandDispatcher"

test("is a specific commit ancestor of current commit", ()=>{
    const gitObject = new GitObject()
    const cmdDisp = new CommandDispatcher(gitObject)
    const firstSha = gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand("git commit")

    expect(
        gitObject.isSpecificCommitAnAncestorOfCurrentCommit(firstSha)
    ).toBe(true)
    
})

test("is a current commit ancestor of specific commit", ()=>{
    const gitObject = new GitObject()
    const cmdDisp = new CommandDispatcher(gitObject)
    const firstSha = gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand("git commit")
    const secondHash = gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand(`git checkout ${firstSha}`)

    expect(
        gitObject.isCurrentCommitAnAncestorOf(secondHash)
    ).toBe(true)
    expect(
        gitObject.isCurrentCommitAnAncestorOf(firstSha)
    ).toBe(false)
})
