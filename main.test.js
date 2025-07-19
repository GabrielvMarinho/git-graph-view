import CommandDispatcher from "./Input/CommandDispatcher"


test("git checkout -b", () =>{
    var cmdDisp = new CommandDispatcher() 
    expect(
        cmdDisp.receiveAndDispatchCommand("git checkout -b dev")
    ).toBe("Switched to a new branch dev")
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

test("git commit -m 'message'", () =>{
    var cmdDisp = new CommandDispatcher() 
    
    expect(
        cmdDisp.receiveAndDispatchCommand("git commit -m 'testing'")
    ).toBe("testing")


})
