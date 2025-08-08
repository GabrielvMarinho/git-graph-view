import GitObject from "../../GitObjectStructure/GitObject"
import CommandDispatcher from "../../Input/CommandDispatcher"

test("fast forward or normal merge checking", ()=>{
    const gitObject = new GitObject()
    const cmdDisp = new CommandDispatcher(gitObject)    
    
    firstCommit = gitObject.getCurrentHash().slice(0, 7)
    cmdDisp.receiveAndDispatchCommand("git commit")
    secondCommit = gitObject.getCurrentHash().slice(0, 7)
    cmdDisp.receiveAndDispatchCommand("git checkout -b dev")
    cmdDisp.receiveAndDispatchCommand("git commit")
    cmdDisp.receiveAndDispatchCommand("git checkout main")

    expect(
        gitObject.isMergeFastForward("dev")
    ).toBe(true)
    cmdDisp.receiveAndDispatchCommand("git commit")
    expect(
        gitObject.isMergeFastForward("dev")
    ).toBe(false)
    cmdDisp.receiveAndDispatchCommand("git checkout dev")
    expect(
        gitObject.isMergeFastForward("main")
    ).toBe(false)
    
    
})


test("fast forward merge in branch to branch", ()=>{
    const gitObject = new GitObject()
    const cmdDisp = new CommandDispatcher(gitObject)    
    
    var firstHash = gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand("git checkout -b dev")    
    cmdDisp.receiveAndDispatchCommand("git commit")
    var secondHash = gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand("git checkout main")
    expect(
        cmdDisp.receiveAndDispatchCommand("git merge dev")
    ).toBe(`Updating ${firstHash.slice(0, 7)}..${secondHash.slice(0, 7)}\nFast-forward`)

    var currentBranch = gitObject.getCurrentBranch()
    expect(
        currentBranch.name
    ).toBe("main")
    expect(
        currentBranch.currentHash
    ).toBe(secondHash)
})
test("fast forward merge in detached head to branch", ()=>{
    const gitObject = new GitObject()
    const cmdDisp = new CommandDispatcher(gitObject)    
    
    var firstHash = gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand("git commit")
    var secondHash = gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand(`git checkout ${firstHash}`)
    expect(
        cmdDisp.receiveAndDispatchCommand("git merge main")
    ).toBe(`Updating ${firstHash.slice(0, 7)}..${secondHash.slice(0, 7)}\nFast-forward`)
    
    expect(
        gitObject.isHeadDetached()
    ).toBe(true)
    expect(
        gitObject.getCurrentHash()
    ).toBe(secondHash)
})

test("fast forward merge in detached head to detached head", ()=>{
    const gitObject = new GitObject()
    const cmdDisp = new CommandDispatcher(gitObject)    
    
    var firstHash = gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand("git commit")
    var secondHash = gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand(`git checkout ${firstHash}`)

    expect(
        cmdDisp.receiveAndDispatchCommand(`git merge ${secondHash}`)
    ).toBe(`Updating ${firstHash.slice(0, 7)}..${secondHash.slice(0, 7)}\nFast-forward`)

    expect(
        gitObject.isHeadDetached()
    ).toBe(true)
    
    expect(
        gitObject.getCurrentHash()
    ).toBe(secondHash)

})
test("fast forward merge in branch to detached head", ()=>{
    const gitObject = new GitObject()
    const cmdDisp = new CommandDispatcher(gitObject)    
    
    var firstHash = gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand(`git checkout ${firstHash}`)
    cmdDisp.receiveAndDispatchCommand("git commit")
    var secondHash = gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand("git checkout main")

    expect(
        cmdDisp.receiveAndDispatchCommand(`git merge ${secondHash}`)
    ).toBe(`Updating ${firstHash.slice(0, 7)}..${secondHash.slice(0, 7)}\nFast-forward`)

    var currentBranch = gitObject.getCurrentBranch()
    expect(
        currentBranch.name
    ).toBe("main")
    expect(
        currentBranch.currentHash
    ).toBe(secondHash)

})
