import NoBranchNorCommitHash from "../../Errors/NoBranchNorCommitHash"
import CommandDispatcher from "../../Input/CommandDispatcher"
import GitObject from "../../GitObjectStructure/GitObject";

test("git checkout 'branchOrHash' -q", () =>{
    const gitObject = new GitObject()
    const cmdDisp = new CommandDispatcher(gitObject) 
    hashToCheckout = gitObject.getCurrentHash()

    cmdDisp.receiveAndDispatchCommand("git checkout -b dev")
    expect(
        cmdDisp.receiveAndDispatchCommand("git checkout main -q")
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
        cmdDisp.receiveAndDispatchCommand("git checkout -b dev --quiet")
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
    ).toThrow("fatal: '-q' is not a valid branch name")
    expect(
        () => cmdDisp.receiveAndDispatchCommand("git checkout --quiet -b .")
    ).toThrow("fatal: '.' is not a valid branch name")

    expect(
        gitObject.getCurrentState()["head"].currentPosition
    ).toBe("newestBranch")
})


