import CommandManager from "./Classes/CommandManager.js"
import GitObject from "./Classes/GitObject.js"



const commandManager = new CommandManager()

test("creating commit", () =>{
    const firstHash = Object.keys(commandManager.getGraph())[0]
    
    const commit = commandManager.commit("Second commit")
    expect(
        commit.parents
    ).toContain(firstHash)
    
    expect(
        commit.message
    ).toBe("Second commit")
})

