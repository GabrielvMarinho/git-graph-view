import GitObject from "../../GitObjectStructure/GitObject"
import CommandDispatcher from "../../Input/CommandDispatcher"

test("git commit", () =>{
    const gitObject = new GitObject()
    const cmdDisp = new CommandDispatcher(gitObject)    
    
    firstSha = gitObject.getCurrentHash().slice(0, 7)
    response = cmdDisp.receiveAndDispatchCommand("git commit -q")
    newSha = gitObject.getCurrentHash().slice(0, 7)
    expect(response).toBe()
    expect(newSha).not.toBe(firstSha)

    currentBranch = gitObject.getCurrentBranch()
    expect(currentBranch.name).toBe("main")
})
