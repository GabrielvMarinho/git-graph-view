import CommandDispatcher from "./Input/CommandDispatcher"


test("git checkout -b dev", () =>{
    var cmdDisp = new CommandDispatcher() 
    cmdDisp.receiveAndDispatchCommand("git checkout -b dev")
    expect(
        cmdDisp.commandManager.getCurrentState()["head"].currentPosition
    ).toBe("dev")
})
test("git commit", () =>{
    var cmdDisp = new CommandDispatcher() 
    cmdDisp.receiveAndDispatchCommand("git commit")

    expect(
        Object.entries(cmdDisp.commandManager.getCurrentState()["graph"]).length
    ).toBeGreaterThan(1)
    
    expect(
        Object.values(cmdDisp.commandManager.getCurrentState()["graph"])[1].message
    ).toBe(null)
})
test("git commit -m 'message'", () =>{
    var cmdDisp = new CommandDispatcher() 

    cmdDisp.receiveAndDispatchCommand("git commit -m 'testing'")

    expect(
        Object.values(cmdDisp.commandManager.getCurrentState()["graph"])[1].message
    ).toBe("testing")
})
