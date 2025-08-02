import CommandDispatcher from "../../Input/CommandDispatcher";

//branch to branch "Merge branch 'outsideBranch' into 'currentBranch'"
//branch to hash "Merge commit 'hash' into 'currentBranch'"
//head to hash "Merge commit 'hash' into HEAD"
//head to branch "Merge commit 'outsideBranch' into HEAD"

test("normal merge in branch to branch", () =>{
    const cmdDisp = new CommandDispatcher()    
    cmdDisp.receiveAndDispatchCommand("git checkout -b 'dev'")
    cmdDisp.receiveAndDispatchCommand("git commit")
    const devHash = cmdDisp.commandManager.gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand("git checkout main")
    cmdDisp.receiveAndDispatchCommand("git commit")
    const mainHash = cmdDisp.commandManager.gitObject.getCurrentHash()

    expect(
        cmdDisp.receiveAndDispatchCommand("git merge dev")    
    ).toBe(`Merge branch 'dev' into main`)
    const currentCommit = cmdDisp.commandManager.gitObject.getGraph()[cmdDisp.commandManager.gitObject.getCurrentHash()]
    expect(
        currentCommit.message   
    ).toBe(`Merge branch 'dev' into main`)
    expect(
        String(currentCommit.parents)
    ).toBe(`${mainHash},${devHash}`)    
})


test("normal merge in branch to hash", () =>{
    const cmdDisp = new CommandDispatcher()    
    cmdDisp.receiveAndDispatchCommand("git checkout -b 'dev'")
    cmdDisp.receiveAndDispatchCommand("git commit")
    const devHash = cmdDisp.commandManager.gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand("git checkout main")
    cmdDisp.receiveAndDispatchCommand("git commit")
    const mainHash = cmdDisp.commandManager.gitObject.getCurrentHash()

    expect(
        cmdDisp.receiveAndDispatchCommand(`git merge ${devHash}`)    
    ).toBe(`Merge commit '${devHash.slice(0, 7)}' into main`)
    const currentCommit = cmdDisp.commandManager.gitObject.getGraph()[cmdDisp.commandManager.gitObject.getCurrentHash()]
    expect(
        currentCommit.message   
    ).toBe(`Merge commit '${devHash.slice(0, 7)}' into main`)
    expect(
        String(currentCommit.parents)
    ).toBe(`${mainHash},${devHash}`)    
})


test("normal merge in hash to hash", () =>{
    const cmdDisp = new CommandDispatcher()    
    cmdDisp.receiveAndDispatchCommand("git checkout -b 'dev'")
    cmdDisp.receiveAndDispatchCommand("git commit")
    const devHash = cmdDisp.commandManager.gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand("git checkout main")
    cmdDisp.receiveAndDispatchCommand("git commit")
    const mainHash = cmdDisp.commandManager.gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand(`git checkout ${mainHash}`)

    expect(
        cmdDisp.receiveAndDispatchCommand(`git merge ${devHash}`)    
    ).toBe(`Merge commit '${devHash.slice(0, 7)}' into HEAD`)
    const currentCommit = cmdDisp.commandManager.gitObject.getGraph()[cmdDisp.commandManager.gitObject.getCurrentHash()]
    expect(
        currentCommit.message   
    ).toBe(`Merge commit '${devHash.slice(0, 7)}' into HEAD`)
    expect(
        String(currentCommit.parents)
    ).toBe(`${mainHash},${devHash}`)    
})

test("normal merge in hash to branch", () =>{
    const cmdDisp = new CommandDispatcher()    
    cmdDisp.receiveAndDispatchCommand("git checkout -b 'dev'")
    cmdDisp.receiveAndDispatchCommand("git commit")
    const devHash = cmdDisp.commandManager.gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand("git checkout main")
    cmdDisp.receiveAndDispatchCommand("git commit")
    const mainHash = cmdDisp.commandManager.gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand(`git checkout ${mainHash}`)

    expect(
        cmdDisp.receiveAndDispatchCommand(`git merge dev`)    
    ).toBe(`Merge commit '${devHash.slice(0, 7)}' into HEAD`)
    const currentCommit = cmdDisp.commandManager.gitObject.getGraph()[cmdDisp.commandManager.gitObject.getCurrentHash()]
    expect(
        currentCommit.message   
    ).toBe(`Merge commit '${devHash.slice(0, 7)}' into HEAD`)
    expect(
        String(currentCommit.parents)
    ).toBe(`${mainHash},${devHash}`)    
})