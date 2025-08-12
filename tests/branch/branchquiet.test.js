import GitObject from "../../GitObjectStructure/GitObject"
import CommandDispatcher from "../../Input/CommandDispatcher"

test("git branch -q", ()=>{
    const gitObject = new GitObject()
    const cmdDisp = new CommandDispatcher(gitObject)
    expect(
        cmdDisp.receiveAndDispatchCommand("git branch -q")
    ).toBe("* main")
})

test("git branch -d 'existingBranch'", ()=>{
    const gitObject = new GitObject()
    const cmdDisp = new CommandDispatcher(gitObject)
    cmdDisp.receiveAndDispatchCommand("git branch dev")
    cmdDisp.receiveAndDispatchCommand("git commit")
    cmdDisp.receiveAndDispatchCommand("git checkout dev")
    const devHash = gitObject.getCurrentHash()
    expect(
        () => cmdDisp.receiveAndDispatchCommand("git branch -d main -q")
    ).toThrow("error: The branch 'main' is not fully merged.\nIf you are sure you want to delete it, run 'git branch -D main'")
    cmdDisp.receiveAndDispatchCommand("git checkout main")
    
    expect(
        cmdDisp.receiveAndDispatchCommand("git branch -d dev -q")
    ).toBe()
    
})

test("git branch -D 'existingBranch' -q", ()=>{
    const gitObject = new GitObject()
    const cmdDisp = new CommandDispatcher(gitObject)
    cmdDisp.receiveAndDispatchCommand("git branch dev")
    cmdDisp.receiveAndDispatchCommand("git commit")
    cmdDisp.receiveAndDispatchCommand("git checkout dev")
    expect(
        cmdDisp.receiveAndDispatchCommand("git branch -D main -q")
    ).toBe()
    
    expect(
        cmdDisp.receiveAndDispatchCommand("git branch -q")
    ).toBe("* dev")
    
})

