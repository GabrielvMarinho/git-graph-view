import CommandDispatcher from "./Input/CommandDispatcher"

test("detached head", () =>{
    const cmdDisp = new CommandDispatcher()
    currentHash = cmdDisp.commandManager.gitObject.getCurrentHash()
    expect(
        cmdDisp.commandManager.gitObject.isHeadDetached()
    ).toBe(false)
    cmdDisp.receiveAndDispatchCommand(`git checkout ${currentHash}`)
    expect(
        cmdDisp.commandManager.gitObject.isHeadDetached()
    ).toBe(true)
})