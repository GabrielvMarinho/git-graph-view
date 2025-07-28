import CommandDispatcher from "./Input/CommandDispatcher"

test("fast forward merge", ()=>{
    const cmdDisp = new CommandDispatcher()
    firstCommit = cmdDisp.commandManager.gitObject.getCurrentHash().slice(0, 7)
    cmdDisp.receiveAndDispatchCommand("git commit")
    secondCommit = cmdDisp.commandManager.gitObject.getCurrentHash().slice(0, 7)
    cmdDisp.receiveAndDispatchCommand("git checkout -b dev")
    cmdDisp.receiveAndDispatchCommand("git commit")
    cmdDisp.receiveAndDispatchCommand("git checkout main")
    

    expect(
        cmdDisp.receiveAndDispatchCommand("git merge dev")
    ).toBe(`Updating ${firstCommit}..${secondCommit}\nFast-forward`)
})

