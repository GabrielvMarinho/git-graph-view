import CommandDispatcher from "../Input/CommandDispatcher";

test("git reset", ()=>{
    const cmdDisp = new CommandDispatcher()
    const firstSha = cmdDisp.commandManager.gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand("git commit")
    cmdDisp.receiveAndDispatchCommand("git commit")
    cmdDisp.receiveAndDispatchCommand(`git reset ${firstSha}`)
    expect(
        cmdDisp.commandManager.gitObject.getCurrentHash()
    ).toBe(firstSha)
    expect(
        cmdDisp.commandManager.gitObject.getCurrentBranch()
    ).toBe("main")

    cmdDisp.receiveAndDispatchCommand("git checkout -b dev")
    cmdDisp.receiveAndDispatchCommand("git commit")
    cmdDisp.receiveAndDispatchCommand("git commit")
    cmdDisp.receiveAndDispatchCommand("git reset main")
    
    expect(
        cmdDisp.commandManager.gitObject.getCurrentHash()
    ).toBe(firstSha)
    expect(
        cmdDisp.commandManager.gitObject.getCurrentBranch()
    ).toBe("dev")
    
})