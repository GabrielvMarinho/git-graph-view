import Command from "./Input/Command"
import CommandDispatcher from "./Input/CommandDispatcher"

test("extracting value after word", () =>{
    var command = new Command("git merge value", ["merge"])
    expect(
        command.extractValueAfterWord("merge")
    ).toBe("value")

    command = new Command("git merge --squash value", ["merge"])
    expect(
        command.extractValueAfterWord("merge")
    ).toBe("value")

    command = new Command("git merge", ["merge"])
    expect(
        () => command.extractValueAfterWord("merge")
    ).toThrow("Value could not be found in command")

    
})