import CommandDispatcher from "../../Input/CommandDispatcher"

test("git merge --squash 'branch'", ()=>{

    const cmdDisp = new CommandDispatcher()
    cmdDisp.receiveAndDispatchCommand("git commit")
    cmdDisp.receiveAndDispatchCommand("git checkout -b dev")
    cmdDisp.receiveAndDispatchCommand("git commit")
    cmdDisp.receiveAndDispatchCommand("git checkout main")
    cmdDisp.receiveAndDispatchCommand("git commit")
    var response = cmdDisp.receiveAndDispatchCommand("git merge --squash dev")

    newSha = cmdDisp.commandManager.gitObject.getCurrentHash().slice(0, 7)
    expect(response).toBe(`[main ${newSha}] Squash merge commit`)
    
})

test("git merge --squash 'hash'", ()=>{

    const cmdDisp = new CommandDispatcher()
    cmdDisp.receiveAndDispatchCommand("git commit")
    var hashToCheckout = cmdDisp.commandManager.gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand(`git checkout ${hashToCheckout}`)
    cmdDisp.receiveAndDispatchCommand("git commit")
    var hashToMerge = cmdDisp.commandManager.gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand("git checkout main")
    cmdDisp.receiveAndDispatchCommand("git commit")
    var response = cmdDisp.receiveAndDispatchCommand(`git merge --squash ${hashToMerge}`)

    newSha = cmdDisp.commandManager.gitObject.getCurrentHash().slice(0, 7)
    console.log(response)
    expect(response).toBe(`[main ${newSha}] Squash merge commit`)
    
})

test("git merge --squash 'hash' in detached head", ()=>{

    const cmdDisp = new CommandDispatcher()
    cmdDisp.receiveAndDispatchCommand("git commit")
    var hashToCheckout = cmdDisp.commandManager.gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand("git commit")
    cmdDisp.receiveAndDispatchCommand(`git checkout ${hashToCheckout}`)
    var hashToMerge = cmdDisp.commandManager.gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand("git commit")
    var response = cmdDisp.receiveAndDispatchCommand(`git merge --squash ${hashToMerge}`)

    newSha = cmdDisp.commandManager.gitObject.getCurrentHash().slice(0, 7)
    console.log(response)
    expect(response).toBe(`[detached HEAD ${newSha}] Squash merge commit`)
    
})