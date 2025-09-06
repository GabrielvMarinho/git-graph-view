import CommandDispatcher from "../../Input/CommandDispatcher";
import GitObject from "../../GitObjectStructure/GitObject";

//branch to branch "Merge branch 'outsideBranch' into 'currentBranch'"
//branch to hash "Merge commit 'hash' into 'currentBranch'"
//head to hash "Merge commit 'hash' into HEAD"
//head to branch "Merge commit 'outsideBranch' into HEAD"
test("already up to date", ()=>{
    const gitObject = new GitObject()
    const cmdDisp = new CommandDispatcher(gitObject)    
        
    cmdDisp.receiveAndDispatchCommand("git commit")
    expect(
        () =>cmdDisp.receiveAndDispatchCommand("git merge main")
    ).toThrow("Already up to date.")
    cmdDisp.receiveAndDispatchCommand("git branch dev")
    cmdDisp.receiveAndDispatchCommand("git commit")
    cmdDisp.receiveAndDispatchCommand("git checkout dev")
    cmdDisp.receiveAndDispatchCommand("git commit")
    cmdDisp.receiveAndDispatchCommand("git merge main")

    expect(
        () =>cmdDisp.receiveAndDispatchCommand("git merge main")
    ).toThrow("Already up to date.")

})
test("normal merge in branch to branch", () =>{
    const gitObject = new GitObject()
    const cmdDisp = new CommandDispatcher(gitObject)    
        
    cmdDisp.receiveAndDispatchCommand("git checkout -b 'dev'")
    cmdDisp.receiveAndDispatchCommand("git commit")
    const devHash = gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand("git checkout main")
    cmdDisp.receiveAndDispatchCommand("git commit")
    const mainHash = gitObject.getCurrentHash()

    expect(
        cmdDisp.receiveAndDispatchCommand("git merge dev")    
    ).toBe(`Merge branch 'dev' into main`)
    const currentCommit = gitObject.getGraph()[gitObject.getCurrentHash()]
    expect(
        currentCommit.message   
    ).toBe(`Merge branch 'dev' into main`)
    expect(
        String(currentCommit.parents)
    ).toBe(`${mainHash},${devHash}`)    
})


test("normal merge in branch to hash", () =>{
    const gitObject = new GitObject()
    const cmdDisp = new CommandDispatcher(gitObject)    
        
    cmdDisp.receiveAndDispatchCommand("git checkout -b 'dev'")
    cmdDisp.receiveAndDispatchCommand("git commit")
    const devHash = gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand("git checkout main")
    cmdDisp.receiveAndDispatchCommand("git commit")
    const mainHash = gitObject.getCurrentHash()

    expect(
        cmdDisp.receiveAndDispatchCommand(`git merge ${devHash}`)    
    ).toBe(`Merge commit '${devHash.slice(0, 7)}' into main`)
    const currentCommit = gitObject.getGraph()[gitObject.getCurrentHash()]
    expect(
        currentCommit.message   
    ).toBe(`Merge commit '${devHash.slice(0, 7)}' into main`)
    expect(
        String(currentCommit.parents)
    ).toBe(`${mainHash},${devHash}`)    
})


test("normal merge in hash to hash", () =>{
    const gitObject = new GitObject()
    const cmdDisp = new CommandDispatcher(gitObject)    
        
    cmdDisp.receiveAndDispatchCommand("git checkout -b 'dev'")
    cmdDisp.receiveAndDispatchCommand("git commit")
    const devHash = gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand("git checkout main")
    cmdDisp.receiveAndDispatchCommand("git commit")
    const mainHash = gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand(`git checkout ${mainHash}`)

    expect(
        cmdDisp.receiveAndDispatchCommand(`git merge ${devHash}`)    
    ).toBe(`Merge commit '${devHash.slice(0, 7)}' into HEAD`)
    const currentCommit = gitObject.getGraph()[gitObject.getCurrentHash()]
    expect(
        currentCommit.message   
    ).toBe(`Merge commit '${devHash.slice(0, 7)}' into HEAD`)
    expect(
        String(currentCommit.parents)
    ).toBe(`${mainHash},${devHash}`)    
})

test("normal merge in hash to branch", () =>{
    const gitObject = new GitObject()
    const cmdDisp = new CommandDispatcher(gitObject)    
        
    cmdDisp.receiveAndDispatchCommand("git checkout -b 'dev'")
    cmdDisp.receiveAndDispatchCommand("git commit")
    const devHash = gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand("git checkout main")
    cmdDisp.receiveAndDispatchCommand("git commit")
    const mainHash = gitObject.getCurrentHash()
    cmdDisp.receiveAndDispatchCommand(`git checkout ${mainHash}`)

    expect(
        cmdDisp.receiveAndDispatchCommand(`git merge dev`)    
    ).toBe(`Merge commit '${devHash.slice(0, 7)}' into HEAD`)
    const currentCommit = gitObject.getGraph()[gitObject.getCurrentHash()]
    expect(
        currentCommit.message   
    ).toBe(`Merge commit '${devHash.slice(0, 7)}' into HEAD`)
    expect(
        String(currentCommit.parents)
    ).toBe(`${mainHash},${devHash}`)    
})