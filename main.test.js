import CommandManager from "./Classes/CommandManager.js"


test("creating commit from a branch", () =>{
    const commandManager = new CommandManager()

    const firstHash = Object.keys(commandManager.getCurrentState()["graph"])[0]
    
    const commit = commandManager.commit("Second commit")

    const newHash = Object.keys(commandManager.getCurrentState()["graph"])[1]

    const currentBranch = commandManager.getCurrentState()["branches"][0]

    expect(
        currentBranch.currentHash
    ).toBe(newHash)

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

    commandManager.checkout(firstHash)

    const commit = commandManager.commit("Second commit")

    const newHash = Object.keys(commandManager.getCurrentState()["graph"])[1]


    const headCurrentPosition = commandManager.getCurrentState()["head"].currentPosition

    expect(
        newHash
    ).toBe(headCurrentPosition)

    expect(
        commit.parents
    ).toContain(firstHash)
    
    expect(
        commit.message
    ).toBe("Second commit")
});

