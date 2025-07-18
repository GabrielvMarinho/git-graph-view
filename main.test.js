import CommandDispatcher from "./Input/CommandDispatcher"


test("git checkout -b dev", () =>{
    var cmdDisp = new CommandDispatcher() 
    cmdDisp.receiveAndDispatchCommand("git checkout -b dev")
    expect(
        cmdDisp.commandManager.getCurrentState()["head"].currentPosition
    ).toBe("dev")
})

