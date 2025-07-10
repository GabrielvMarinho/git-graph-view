import Commit from "./Commit.js";
import crypto from "crypto"
import Head from "./Head.js";
import Branch from "./Branch.js";
export default class CommitGraph{
    
    constructor(){
        var first_sha = crypto.randomBytes(20).toString("hex")
        // always start with a commit
        this.graph = {[first_sha]:new Commit()}
        this.head = new Head(first_sha)
        //default and only branch being master
        var master = new Branch("master", first_sha)
        this.branches = [master]
        this.currentBranch = master
    }

    getCurrentState(){
        return {
            "graph":this.graph,
            "branches":this.branches,
            "head":this.head,
            "currentBranch":this.currentBranch
        }
        
    }

    getRandomSha(){
        return crypto.randomBytes(20).toString("hex");
    }

    createCommit(after_id){
        if (after_id == null){
            after_id = Object.keys(graph)[0]
        }
        const next_commit = this.getRandomSha()
        this.graph[next_commit] = new Commit()
        appendCommit(after_id, next_commit)
    }

    appendCommit(after_id, commit_id){
        this.graph[after_id].appendCommit(commit_id)
    } 

}
