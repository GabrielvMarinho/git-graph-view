import CommandDispatcher from "../Input/CommandDispatcher"

test("git commit", () =>{
    const cmdDisp = new CommandDispatcher()
    firstSha = cmdDisp.commandManager.gitObject.getCurrentHash().slice(0, 7)
    response = cmdDisp.receiveAndDispatchCommand("git commit")
    newSha = cmdDisp.commandManager.gitObject.getCurrentHash().slice(0, 7)
    expect(response).toBe(`[main ${newSha}]`)
    expect(newSha).not.toBe(firstSha)

    currentBranch = cmdDisp.commandManager.gitObject.getCurrentBranch()
    expect(currentBranch.name).toBe("main")

    cmdDisp.receiveAndDispatchCommand("git checkout "+newSha)
    response = cmdDisp.receiveAndDispatchCommand("git commit")
    newSha = cmdDisp.commandManager.gitObject.getCurrentHash().slice(0, 7)
    expect(response).toBe(`[detached HEAD ${newSha}]`)
})

test("git commit -m 'message'", () =>{
    const cmdDisp = new CommandDispatcher()
    firstSha = cmdDisp.commandManager.gitObject.getCurrentHash().slice(0, 7)
    response = cmdDisp.receiveAndDispatchCommand("git commit -m 'this is a message'")
    newSha = cmdDisp.commandManager.gitObject.getCurrentHash().slice(0, 7)
    expect(response).toBe(`[main ${newSha}] this is a message`)
    expect(newSha).not.toBe(firstSha)

    currentBranch = cmdDisp.commandManager.gitObject.getCurrentBranch()
    expect(currentBranch.name).toBe("main")

    cmdDisp.receiveAndDispatchCommand("git checkout "+newSha)
    response = cmdDisp.receiveAndDispatchCommand("git commit -m 'new message'")
    newSha = cmdDisp.commandManager.gitObject.getCurrentHash().slice(0, 7)
    expect(response).toBe(`[detached HEAD ${newSha}] new message`)
})