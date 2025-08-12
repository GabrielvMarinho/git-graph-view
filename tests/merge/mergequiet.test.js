import GitObject from "../../GitObjectStructure/GitObject"
import CommandDispatcher from "../../Input/CommandDispatcher"

test("git merge --squash 'branch' -q", ()=>{

    const gitObject = new GitObject()
    const cmdDisp = new CommandDispatcher(gitObject)    
    
    cmdDisp.receiveAndDispatchCommand("git commit")
    cmdDisp.receiveAndDispatchCommand("git checkout -b dev")
    cmdDisp.receiveAndDispatchCommand("git commit")
    cmdDisp.receiveAndDispatchCommand("git checkout main")
    cmdDisp.receiveAndDispatchCommand("git commit")
    var response = cmdDisp.receiveAndDispatchCommand("git merge --squash dev -q")
    expect(response).toBe()
    
})



test("normal merge in branch to branch -q", () =>{
    const gitObject = new GitObject()
    const cmdDisp = new CommandDispatcher(gitObject)    
        
    cmdDisp.receiveAndDispatchCommand("git checkout -b 'dev'")
    cmdDisp.receiveAndDispatchCommand("git commit")
    const devHash = gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand("git checkout main")
    cmdDisp.receiveAndDispatchCommand("git commit")
    const mainHash = gitObject.getCurrentHash()

    expect(
        cmdDisp.receiveAndDispatchCommand("git merge dev -q")    
    ).toBe()
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
        cmdDisp.receiveAndDispatchCommand("git merge dev -q")
    ).toBe()

})