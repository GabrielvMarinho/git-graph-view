import CommandDispatcher from "../Input/CommandDispatcher"
import GitObject from "../GitObjectStructure/GitObject";

test("detached head", () =>{
    const gitObject = new GitObject()
    const cmdDisp = new CommandDispatcher(gitObject)    
    
    currentHash = gitObject.getCurrentHash()
    expect(
        gitObject.isHeadDetached()
    ).toBe(false)
    cmdDisp.receiveAndDispatchCommand(`git checkout ${currentHash}`)
    expect(
        gitObject.isHeadDetached()
    ).toBe(true)
})