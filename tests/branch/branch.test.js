import GitObject from "../../GitObjectStructure/GitObject"
import CommandDispatcher from "../../Input/CommandDispatcher"

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

test("git branch -d 'branchHeadOn'", ()=>{
    const gitObject = new GitObject()
    const cmdDisp = new CommandDispatcher(gitObject)
    expect(
        () => cmdDisp.receiveAndDispatchCommand("git branch -d main")
    ).toThrow("error: cannot delete branch 'main' used by worktree")

})

test("git branch -d 'nonExistingBranch'", ()=>{
    const gitObject = new GitObject()
    const cmdDisp = new CommandDispatcher(gitObject)
    expect(
        () => cmdDisp.receiveAndDispatchCommand("git branch -d 2e3a3cc")
    ).toThrow("error: branch '2e3a3cc' not found")

    expect(
        () => cmdDisp.receiveAndDispatchCommand("git branch -d dev")
    ).toThrow("error: branch 'dev' not found")
})


test("git branch -d 'existingBranch'", ()=>{
    const gitObject = new GitObject()
    const cmdDisp = new CommandDispatcher(gitObject)
    cmdDisp.receiveAndDispatchCommand("git branch dev")
    cmdDisp.receiveAndDispatchCommand("git commit")
    cmdDisp.receiveAndDispatchCommand("git checkout dev")
    const devHash = gitObject.getCurrentHash()
    expect(
        () => cmdDisp.receiveAndDispatchCommand("git branch -d main")
    ).toThrow("error: The branch 'main' is not fully merged.\nIf you are sure you want to delete it, run 'git branch -D main'")
    cmdDisp.receiveAndDispatchCommand("git checkout main")
    
    expect(
        cmdDisp.receiveAndDispatchCommand("git branch -d dev")
    ).toBe(`Deleted branch dev (was ${devHash.slice(0, 7)})`)

    expect(
        cmdDisp.receiveAndDispatchCommand("git branch")
    ).toBe("* main")
    
})


test("git branch -D 'branchHeadOn'", ()=>{
    const gitObject = new GitObject()
    const cmdDisp = new CommandDispatcher(gitObject)
    expect(
        () => cmdDisp.receiveAndDispatchCommand("git branch -D main")
    ).toThrow("error: cannot delete branch 'main' used by worktree")

})

test("git branch -D 'nonExistingBranch'", ()=>{
    const gitObject = new GitObject()
    const cmdDisp = new CommandDispatcher(gitObject)
    expect(
        () => cmdDisp.receiveAndDispatchCommand("git branch -D 2e3a3cc")
    ).toThrow("error: branch '2e3a3cc' not found")
    
    expect(
        () => cmdDisp.receiveAndDispatchCommand("git branch -D dev")
    ).toThrow("error: branch 'dev' not found")
})


test("git branch -D 'existingBranch'", ()=>{
    const gitObject = new GitObject()
    const cmdDisp = new CommandDispatcher(gitObject)

    cmdDisp.receiveAndDispatchCommand("git branch dev")
    cmdDisp.receiveAndDispatchCommand("git commit")
    const mainHash = gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand("git checkout dev")
    expect(
        cmdDisp.receiveAndDispatchCommand("git branch -D main")
    ).toBe(`Deleted branch main (was ${mainHash.slice(0, 7)})`)
    
    expect(
        cmdDisp.receiveAndDispatchCommand("git branch")
    ).toBe("* dev")
    
})

