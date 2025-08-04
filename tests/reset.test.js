import CommandDispatcher from "../Input/CommandDispatcher";

test("git reset", ()=>{
    const cmdDisp = new CommandDispatcher()
    const firstSha = cmdDisp.commandManager.gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand("git commit")
    cmdDisp.receiveAndDispatchCommand("git commit")
    cmdDisp.receiveAndDispatchCommand(`git reset ${firstSha}`)
    var curentBranch = cmdDisp.commandManager.gitObject.getCurrentBranch()
    expect(
        curentBranch.currentHash
    ).toBe(firstSha)
    expect(
        curentBranch.name
    ).toBe("main")

    cmdDisp.receiveAndDispatchCommand("git checkout -b dev")
    cmdDisp.receiveAndDispatchCommand("git commit")
    cmdDisp.receiveAndDispatchCommand("git commit")
    cmdDisp.receiveAndDispatchCommand("git reset main")
    
    var curentBranch = cmdDisp.commandManager.gitObject.getCurrentBranch()
    expect(
        curentBranch.currentHash
    ).toBe(firstSha)
    expect(
        curentBranch.name
    ).toBe("dev")
    
})


test("git reset --hard --soft --mixed", ()=>{
    const cmdDisp = new CommandDispatcher()
    const firstSha = cmdDisp.commandManager.gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand("git commit")
    cmdDisp.receiveAndDispatchCommand("git commit")
    cmdDisp.receiveAndDispatchCommand(`git reset --hard --mixed ${firstSha} --soft`)
    var curentBranch = cmdDisp.commandManager.gitObject.getCurrentBranch()
    expect(
        curentBranch.currentHash
    ).toBe(firstSha)
    expect(
        curentBranch.name
    ).toBe("main")
})