import CommandDispatcher from "./Input/CommandDispatcher"

test("fast forward or normal merge checking", ()=>{
    const cmdDisp = new CommandDispatcher()
    firstCommit = cmdDisp.commandManager.gitObject.getCurrentHash().slice(0, 7)
    cmdDisp.receiveAndDispatchCommand("git commit")
    secondCommit = cmdDisp.commandManager.gitObject.getCurrentHash().slice(0, 7)
    cmdDisp.receiveAndDispatchCommand("git checkout -b dev")
    cmdDisp.receiveAndDispatchCommand("git commit")
    cmdDisp.receiveAndDispatchCommand("git checkout main")

    expect(
        cmdDisp.commandManager.gitObject.isMergeFastForward("dev")
    ).toBe(true)
    cmdDisp.receiveAndDispatchCommand("git commit")
    expect(
        cmdDisp.commandManager.gitObject.isMergeFastForward("dev")
    ).toBe(false)
    cmdDisp.receiveAndDispatchCommand("git checkout dev")
    expect(
        cmdDisp.commandManager.gitObject.isMergeFastForward("main")
    ).toBe(false)
    
    
})

