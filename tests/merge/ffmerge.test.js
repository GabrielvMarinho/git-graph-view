import CommandDispatcher from "../../Input/CommandDispatcher"

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


test("fast forward merge in branch to branch", ()=>{
    const cmdDisp = new CommandDispatcher()
    var firstHash = cmdDisp.commandManager.gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand("git checkout -b dev")    
    cmdDisp.receiveAndDispatchCommand("git commit")
    var secondHash = cmdDisp.commandManager.gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand("git checkout main")
    expect(
        cmdDisp.receiveAndDispatchCommand("git merge dev")
    ).toBe(`Updating ${firstHash.slice(0, 7)}..${secondHash.slice(0, 7)}\nFast-forward`)

    var currentBranch = cmdDisp.commandManager.gitObject.getCurrentBranch()
    expect(
        currentBranch.name
    ).toBe("main")
    expect(
        currentBranch.currentHash
    ).toBe(secondHash)
})
test("fast forward merge in detached head to branch", ()=>{
    const cmdDisp = new CommandDispatcher()
    var firstHash = cmdDisp.commandManager.gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand("git commit")
    var secondHash = cmdDisp.commandManager.gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand(`git checkout ${firstHash}`)
    expect(
        cmdDisp.receiveAndDispatchCommand("git merge main")
    ).toBe(`Updating ${firstHash.slice(0, 7)}..${secondHash.slice(0, 7)}\nFast-forward`)
    
    expect(
        () => cmdDisp.commandManager.gitObject.getCurrentBranch()
    ).toThrow("Not in a branch currently")
    expect(
        cmdDisp.commandManager.gitObject.getCurrentHash()
    ).toBe(secondHash)
})

test("fast forward merge in detached head to detached head", ()=>{
    const cmdDisp = new CommandDispatcher()
    var firstHash = cmdDisp.commandManager.gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand("git commit")
    var secondHash = cmdDisp.commandManager.gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand(`git checkout ${firstHash}`)

    expect(
        cmdDisp.receiveAndDispatchCommand(`git merge ${secondHash}`)
    ).toBe(`Updating ${firstHash.slice(0, 7)}..${secondHash.slice(0, 7)}\nFast-forward`)

    expect(
        () => cmdDisp.commandManager.gitObject.getCurrentBranch()
    ).toThrow("Not in a branch currently")
    expect(
        cmdDisp.commandManager.gitObject.getCurrentHash()
    ).toBe(secondHash)

})
test("fast forward merge in branch to detached head", ()=>{
    const cmdDisp = new CommandDispatcher()
    var firstHash = cmdDisp.commandManager.gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand(`git checkout ${firstHash}`)
    cmdDisp.receiveAndDispatchCommand("git commit")
    var secondHash = cmdDisp.commandManager.gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand("git checkout main")

    expect(
        cmdDisp.receiveAndDispatchCommand(`git merge ${secondHash}`)
    ).toBe(`Updating ${firstHash.slice(0, 7)}..${secondHash.slice(0, 7)}\nFast-forward`)

    var currentBranch = cmdDisp.commandManager.gitObject.getCurrentBranch()
    expect(
        currentBranch.name
    ).toBe("main")
    expect(
        currentBranch.currentHash
    ).toBe(secondHash)

})
