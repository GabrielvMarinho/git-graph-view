import GitObject from "../GitObjectStructure/GitObject"
import CommandDispatcher from "../Input/CommandDispatcher"

test("childless commit", ()=>{
    const gitObject = new GitObject()
    const cmdDisp = new CommandDispatcher(gitObject)
    expect(
        gitObject.isCurrentCommitChildLess()
    ).toBe(true)
    cmdDisp.receiveAndDispatchCommand("git branch dev")
    cmdDisp.receiveAndDispatchCommand("git commit")
    cmdDisp.receiveAndDispatchCommand("git checkout dev")
    expect(
        gitObject.isCurrentCommitChildLess() 
    ).toBe(false)
})