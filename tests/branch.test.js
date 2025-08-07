import GitObject from "../GitObjectStructure/GitObject"
import CommandDispatcher from "../Input/CommandDispatcher"

test("git branch", ()=>{
    const gitObject = new GitObject()
    const cmdDisp = new CommandDispatcher(gitObject)
    expect(
        cmdDisp.receiveAndDispatchCommand("git branch")
    ).toBe("* main")
    cmdDisp.receiveAndDispatchCommand("git checkout -b dev")
    expect(
        cmdDisp.receiveAndDispatchCommand("git branch")
    ).toBe("  main\n* dev")
    
})