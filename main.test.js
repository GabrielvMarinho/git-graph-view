import GitObject from "./Classes/GitObject.js"



const gitObject = new GitObject()

test("creating commit", () =>{
    const hash = gitObject.createCommit("Second Commit")
    expect(
        gitObject.getGraph()[hash]
    ).toBeDefined()
})