import CommandDispatcher from "../Input/CommandDispatcher";
import GitObject from "../GitObjectStructure/GitObject";

test("git reset", ()=>{
    const gitObject = new GitObject()
    const cmdDisp = new CommandDispatcher(gitObject)    
    
    const firstSha = gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand("git commit")
    cmdDisp.receiveAndDispatchCommand("git commit")
    cmdDisp.receiveAndDispatchCommand(`git reset ${firstSha}`)
    var curentBranch = gitObject.getCurrentBranch()
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
    
    var curentBranch = gitObject.getCurrentBranch()
    expect(
        curentBranch.currentHash
    ).toBe(firstSha)
    expect(
        curentBranch.name
    ).toBe("dev")
    
})


test("git reset --hard --soft --mixed", ()=>{
    const gitObject = new GitObject()
    const cmdDisp = new CommandDispatcher(gitObject)    
    
    const firstSha = gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand("git commit")
    cmdDisp.receiveAndDispatchCommand("git commit")
    cmdDisp.receiveAndDispatchCommand(`git reset --hard --mixed ${firstSha} --soft`)
    var curentBranch = gitObject.getCurrentBranch()
    expect(
        curentBranch.currentHash
    ).toBe(firstSha)
    expect(
        curentBranch.name
    ).toBe("main")
})