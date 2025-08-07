import NoBranchNorCommitHash from "../Errors/NoBranchNorCommitHash"
import CommandDispatcher from "../Input/CommandDispatcher"
import GitObject from "../GitObjectStructure/GitObject";

test("git checkout 'branchOrHash'", () =>{
    const gitObject = new GitObject()
    const cmdDisp = new CommandDispatcher(gitObject) 
    hashToCheckout = gitObject.getCurrentHash()

    cmdDisp.receiveAndDispatchCommand("git checkout -b dev")
    expect(
        cmdDisp.receiveAndDispatchCommand("git checkout main")
    ).toBe("Switched to branch 'main'")

    expect(
        gitObject.getCurrentState().head.currentPosition
    ).toBe("main")

    expect(
        cmdDisp.receiveAndDispatchCommand(`git checkout ${hashToCheckout}`)
    ).toBe(`Note: switching to ${hashToCheckout}.\nYou are in 'detached HEAD' state`)

    expect(
        gitObject.getCurrentState().head.currentPosition
    ).toBe(hashToCheckout)

    expect(
        () => {cmdDisp.receiveAndDispatchCommand("git checkout nonexisting")}
    ).toThrow(NoBranchNorCommitHash)
})

test("git checkout -b 'branch'", () =>{
    const gitObject = new GitObject()
    const cmdDisp = new CommandDispatcher(gitObject) 
    expect(
        cmdDisp.receiveAndDispatchCommand("git checkout -b dev")
    ).toBe("Switched to a new branch 'dev'")
    expect(
        gitObject.getCurrentState()["head"].currentPosition
    ).toBe("dev")


    
    currentHash = gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand(`git checkout ${currentHash}`)
    expect(
        cmdDisp.receiveAndDispatchCommand("git checkout -b newestBranch")
    ).toBe("Switched to a new branch 'newestBranch'")
    expect(
        gitObject.getCurrentState().head.currentPosition
    ).toBe("newestBranch")
    


    expect(
        () => cmdDisp.receiveAndDispatchCommand("git checkout -b main")
    ).toThrow("fatal: a branch named 'main' already exists")
    expect(
        () => cmdDisp.receiveAndDispatchCommand("git checkout -b")
    ).toThrow("error: switch '-b' requires a value")
    expect(
        () => cmdDisp.receiveAndDispatchCommand("git checkout -b .")
    ).toThrow("fatal: '.' is not a valid branch name")

    expect(
        () => cmdDisp.receiveAndDispatchCommand("git checkout -b -b")
    ).toThrow("fatal: '-b' is not a valid branch name")


})

test("git checkout -b 'branch' 'positionToGo'", () =>{
    const gitObject = new GitObject()

    const cmdDisp = new CommandDispatcher(gitObject) 
    hashToCheckout = gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand("git commit -m 'test'")
    
    expect(
        cmdDisp.receiveAndDispatchCommand(`git checkout -b newBranch ${hashToCheckout}`)
    ).toBe("Switched to a new branch 'newBranch'")
    
    expect(
        gitObject.getCurrentState().branches[1].currentHash
    ).toBe(hashToCheckout)
    expect(
        cmdDisp.receiveAndDispatchCommand(`git checkout -b newestBranch main`)
    ).toBe("Switched to a new branch 'newestBranch'")
    hashToCheckout = gitObject.getCurrentHash()

    expect(
        gitObject.getCurrentState().branches[2].currentHash
    ).toBe(hashToCheckout)
    
})

test("git checkout -B 'branch' ", () =>{
    const gitObject = new GitObject()
    const cmdDisp = new CommandDispatcher(gitObject) 
    expect(
        cmdDisp.receiveAndDispatchCommand("git checkout -B dev")
    ).toBe("Switched to a new branch 'dev'")
    
    expect(
        gitObject.getCurrentState()["head"].currentPosition
    ).toBe("dev")
    
    expect(
        cmdDisp.receiveAndDispatchCommand("git checkout -B main")
    ).toBe("Switched to and reset branch 'main'")
    expect(
        cmdDisp.receiveAndDispatchCommand("git checkout -B main")
    ).toBe("Reset branch 'main'")
    expect(
        () => cmdDisp.receiveAndDispatchCommand("git checkout -B")
    ).toThrow("error: switch '-B' requires a value")
    expect(
        () => cmdDisp.receiveAndDispatchCommand("git checkout -B .")
    ).toThrow("fatal: '.' is not a valid branch name")

    expect(
        () => cmdDisp.receiveAndDispatchCommand("git checkout -B -B")
    ).toThrow("fatal: '-B' is not a valid branch name")
})

test("git checkout -B 'branch' 'positionToGo' ", () =>{
    const gitObject = new GitObject()
    const cmdDisp = new CommandDispatcher(gitObject) 
    hashToCheckout = gitObject.getCurrentHash()
    expect(
        cmdDisp.receiveAndDispatchCommand("git checkout -B dev")
    ).toBe("Switched to a new branch 'dev'")
    expect(
        cmdDisp.receiveAndDispatchCommand("git checkout -B dev")
    ).toBe("Reset branch 'dev'")
    expect(
        () => cmdDisp.receiveAndDispatchCommand("git checkout -B dev nonExistingBranch")
    ).toThrow("fatal: 'nonExistingBranch' is not a commit and a branch 'dev' cannot be created from it")
    
    cmdDisp.receiveAndDispatchCommand("git commit -m 'test'")
    
    expect(
        cmdDisp.receiveAndDispatchCommand(`git checkout -B newBranch ${hashToCheckout}`)
    ).toBe("Reset branch 'newBranch'")
    
    expect(
        gitObject.getCurrentState().branches[2].currentHash
    ).toBe(hashToCheckout)

    expect(
        cmdDisp.receiveAndDispatchCommand(`git checkout -B newBranch dev`)
    ).toBe("Reset branch 'newBranch'")

})
