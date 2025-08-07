import CommandDispatcher from "../../Input/CommandDispatcher"
import GitObject from "../../GitObjectStructure/GitObject";

test("git merge --squash 'branch'", ()=>{

    const gitObject = new GitObject()
    const cmdDisp = new CommandDispatcher(gitObject)    
    
    cmdDisp.receiveAndDispatchCommand("git commit")
    cmdDisp.receiveAndDispatchCommand("git checkout -b dev")
    cmdDisp.receiveAndDispatchCommand("git commit")
    cmdDisp.receiveAndDispatchCommand("git checkout main")
    cmdDisp.receiveAndDispatchCommand("git commit")
    var response = cmdDisp.receiveAndDispatchCommand("git merge --squash dev")

    newSha = gitObject.getCurrentHash().slice(0, 7)
    expect(response).toBe(`[main ${newSha}] Squash merge commit`)
    
})

test("git merge --squash 'hash'", ()=>{

    const gitObject = new GitObject()
    const cmdDisp = new CommandDispatcher(gitObject)    
    
    cmdDisp.receiveAndDispatchCommand("git commit")
    var hashToCheckout = gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand(`git checkout ${hashToCheckout}`)
    cmdDisp.receiveAndDispatchCommand("git commit")
    var hashToMerge = gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand("git checkout main")
    cmdDisp.receiveAndDispatchCommand("git commit")
    var response = cmdDisp.receiveAndDispatchCommand(`git merge --squash ${hashToMerge}`)

    newSha = gitObject.getCurrentHash().slice(0, 7)

    expect(response).toBe(`[main ${newSha}] Squash merge commit`)
    
})

test("git merge --squash 'hash' in detached head", ()=>{

    const gitObject = new GitObject()
    const cmdDisp = new CommandDispatcher(gitObject)    
    
    cmdDisp.receiveAndDispatchCommand("git commit")
    var hashToCheckout = gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand("git commit")
    cmdDisp.receiveAndDispatchCommand(`git checkout ${hashToCheckout}`)
    var hashToMerge = gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand("git commit")
    var response = cmdDisp.receiveAndDispatchCommand(`git merge --squash ${hashToMerge}`)

    newSha = gitObject.getCurrentHash().slice(0, 7)

    expect(response).toBe(`[detached HEAD ${newSha}] Squash merge commit`)
    
})