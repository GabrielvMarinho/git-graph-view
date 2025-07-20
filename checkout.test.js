import CommandDispatcher from "./Input/CommandDispatcher"

test("git checkout -b", () =>{
    var cmdDisp = new CommandDispatcher() 
    expect(
        cmdDisp.receiveAndDispatchCommand("git checkout -b dev")
    ).toBe("Switched to a new branch 'dev'")
    expect(
        cmdDisp.commandManager.getCurrentState()["head"].currentPosition
    ).toBe("dev")
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

test("git checkout -B 'branch' ", () =>{
    var cmdDisp = new CommandDispatcher() 
    expect(
        cmdDisp.receiveAndDispatchCommand("git checkout -B dev")
    ).toBe("Switched to a new branch 'dev'")
    expect(
        cmdDisp.commandManager.getCurrentState()["head"].currentPosition
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
    var cmdDisp = new CommandDispatcher() 
    hashToCheckout = cmdDisp.commandManager.gitObject.getCurrentHash()
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
        cmdDisp.commandManager.gitObject.getCurrentState().branches[2].currentHash
    ).toBe(hashToCheckout)

    expect(
        cmdDisp.receiveAndDispatchCommand(`git checkout -B newBranch dev`)
    ).toBe("Reset branch 'newBranch'")

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
