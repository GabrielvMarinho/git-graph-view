import CommandDispatcher from "../../Input/CommandDispatcher"
import GitObject from "../../GitObjectStructure/GitObject";

test("git commit", () =>{
    const gitObject = new GitObject()
    const cmdDisp = new CommandDispatcher(gitObject)    
    
    firstSha = gitObject.getCurrentHash().slice(0, 7)
    response = cmdDisp.receiveAndDispatchCommand("git commit")
    newSha = gitObject.getCurrentHash().slice(0, 7)
    expect(response).toBe(`[main ${newSha}]`)
    expect(newSha).not.toBe(firstSha)

    currentBranch = gitObject.getCurrentBranch()
    expect(currentBranch.name).toBe("main")

    cmdDisp.receiveAndDispatchCommand("git checkout "+newSha)
    response = cmdDisp.receiveAndDispatchCommand("git commit")
    newSha = gitObject.getCurrentHash().slice(0, 7)
    expect(response).toBe(`[detached HEAD ${newSha}]`)
})

test("git commit -m 'message'", () =>{
    const gitObject = new GitObject()
    const cmdDisp = new CommandDispatcher(gitObject)    
    
    firstSha = gitObject.getCurrentHash().slice(0, 7)
    response = cmdDisp.receiveAndDispatchCommand("git commit -m 'this is a message'")
    newSha = gitObject.getCurrentHash().slice(0, 7)
    expect(response).toBe(`[main ${newSha}] this is a message`)
    expect(newSha).not.toBe(firstSha)

    currentBranch = gitObject.getCurrentBranch()
    expect(currentBranch.name).toBe("main")

    cmdDisp.receiveAndDispatchCommand("git checkout "+newSha)
    response = cmdDisp.receiveAndDispatchCommand("git commit -m 'new message'")
    newSha = gitObject.getCurrentHash().slice(0, 7)
    expect(response).toBe(`[detached HEAD ${newSha}] new message`)
})