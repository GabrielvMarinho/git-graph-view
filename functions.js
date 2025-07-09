import Commit from "./Commit.js"







export function appendCommit(graphOfCommits, after_id, commit_id){

    
    graphOfCommits[after_id].appendCommit(commit_id)
} 

export function createCommit(graphOfCommits, after_id){

    if (after_id == null){
        after_id = Object.keys(graphOfCommits)[0]
    }

    const next_commit = crypto.randomUUID()
    graphOfCommits[next_commit] = new Commit()
    appendCommit(graphOfCommits, after_id, next_commit)
}
