import CommandManager from "./Classes/CommandManager.js"
import GitObject from "./Classes/GitObject.js"




test("creating commit from a branch", () =>{
    const commandManager = new CommandManager()
    console.log(commandManager.getCurrentState())

    const firstHash = Object.keys(commandManager.getCurrentState()["graph"])[0]
    
    const commit = commandManager.commit("Second commit")
    console.log(commandManager.getCurrentState())
    expect(
        commit.parents
    ).toContain(firstHash)
    
    expect(
        commit.message
    ).toBe("Second commit")
});

test("creating commit from a detached head", () =>{
    const commandManager = new CommandManager()
    const firstHash = Object.keys(commandManager.getCurrentState()["graph"])[0]
    
    const commit = commandManager.commit("Second commit")
    console.log(commandManager.getCurrentState())
    expect(
        commit.parents
    ).toContain(firstHash)
    
    expect(
        commit.message
    ).toBe("Second commit")
});

