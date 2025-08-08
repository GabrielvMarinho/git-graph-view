import GitObject from "../GitObjectStructure/GitObject"
import CommandDispatcher from "../Input/CommandDispatcher"

test("git branch", ()=>{
    const gitObject = new GitObject()
    const cmdDisp = new CommandDispatcher(gitObject)
    expect(
        cmdDisp.receiveAndDispatchCommand("git branch")
    ).toBe("* main")
    cmdDisp.receiveAndDispatchCommand("git checkout -b dev")
    expect(
        cmdDisp.receiveAndDispatchCommand("git branch")
    ).toBe("  main\n* dev")
    const currentHash = gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand(`git checkout ${currentHash.slice(0, 7)}`)

    expect(
        cmdDisp.receiveAndDispatchCommand("git branch")
    ).toBe(`* (HEAD detached at ${currentHash.slice(0, 7)})\n  main\n  dev`)
})
test("git branch 'newBranch'", ()=>{

    const gitObject = new GitObject()
    const cmdDisp = new CommandDispatcher(gitObject)
    cmdDisp.receiveAndDispatchCommand("git branch dev")
    expect(
        gitObject.getCurrentBranch().name
    ).toBe("main")
    expect(
        gitObject.getAllBranchesString()
    ).toBe("* main\n  dev")
    expect(
        () => cmdDisp.receiveAndDispatchCommand("git branch dev")
    ).toThrow("fatal: a branch named 'dev' already exists")
})