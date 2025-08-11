import NoBranchNorCommitHash from "../../Errors/NoBranchNorCommitHash"
import CommandDispatcher from "../../Input/CommandDispatcher"
import GitObject from "../../GitObjectStructure/GitObject";

test("git checkout 'branchOrHash'", () =>{
    const gitObject = new GitObject()
    const cmdDisp = new CommandDispatcher(gitObject) 
    hashToCheckout = gitObject.getCurrentHash()

    cmdDisp.receiveAndDispatchCommand("git checkout -b dev")
    expect(
        cmdDisp.receiveAndDispatchCommand("git checkout main")
    ).toBe()

    expect(
        gitObject.getCurrentState().head.currentPosition
    ).toBe("main")

    expect(
        cmdDisp.receiveAndDispatchCommand(`git checkout ${hashToCheckout} -q`)
    ).toBe()

    expect(
        gitObject.getCurrentState().head.currentPosition
    ).toBe(hashToCheckout)

})

test("git checkout -b 'branch'", () =>{
    const gitObject = new GitObject()
    const cmdDisp = new CommandDispatcher(gitObject) 
    expect(
        cmdDisp.receiveAndDispatchCommand("git checkout -b dev -q")
    ).toBe()
    expect(
        gitObject.getCurrentState()["head"].currentPosition
    ).toBe("dev")

    currentHash = gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand(`git checkout ${currentHash}`)
    expect(
        cmdDisp.receiveAndDispatchCommand("git checkout -b newestBranch -q")
    ).toBe()
    expect(
        gitObject.getCurrentState().head.currentPosition
    ).toBe("newestBranch")
    
    expect(
        () => cmdDisp.receiveAndDispatchCommand("git checkout -b main -q")
    ).toThrow("fatal: a branch named 'main' already exists")
    expect(
        () => cmdDisp.receiveAndDispatchCommand("git checkout -b -q")
    ).toThrow("error: switch '-b' requires a value")
    expect(
        () => cmdDisp.receiveAndDispatchCommand("git checkout -q -b .")
    ).toThrow("fatal: '.' is not a valid branch name")

    expect(
        () => cmdDisp.receiveAndDispatchCommand("git checkout -q -b -b")
    ).toThrow("fatal: '-b' is not a valid branch name")

})


