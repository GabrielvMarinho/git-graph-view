import Command from "../Input/Command"

test("extracting value after word", () =>{
    var command = new Command("git merge value", ["merge"])
    expect(
        command.extractValueAfterOneWordIgnoringDash("merge")
    ).toBe("value")

    command = new Command("git merge --squash value", ["merge"])
    expect(
        command.extractValueAfterOneWordIgnoringDash("merge")
    ).toBe("value")

    command = new Command("git merge", ["merge"])
    expect(
        command.extractValueAfterOneWordIgnoringDash("merge")
    ).toBe(null)

    
})