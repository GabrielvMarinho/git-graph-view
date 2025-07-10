import Commit from "./Commit.js";
import crypto from "crypto"
import Head from "./Head.js";
import Branch from "./Branch.js";
export default class CommitGraph{
    
    constructor(){
        var first_sha = this.getRandomSha()
        // always start with a commit
        this.graph = {[first_sha]:new Commit("First commit")}
        //default and only branch being master
        var master = new Branch("master", first_sha)
        this.head = new Head(master.getName())

        this.branches = [master]
    }

    getCurrentState(){
        return {
            "graph":this.graph,
            "branches":this.branches,
            "head":this.head,
        }
        
    }

    
    getGraph(){
        return this.graph
    }
    getRandomSha(){
        return crypto.randomBytes(20).toString("hex");
    }
    getHeadCurrentHash(){
        var branch = this.branches.find(branch => branch.name == this.head.currentPosition)
        if(branch != null){
            return branch.currenHash
        }
        else{
            return this.head.currentPosition
        }


    }

    isHeadDetached(){
        var branch = this.branches.find(branch => this.head.currentPosition == branch.name)
        if(branch){
            return false
        }
        return true
    }
    // always move the branch with the head
    moveHeadWithBranch(hash){
        var commit = Object.keys(this.getGraph()).find(id => id == hash)
        if(commit != null){
            var branch = this.branches.find(branch => this.head.currentPosition == branch.name)
            branch.currenHash = commit    
        }
        else{
            throw new Error("No commit equals to")
        }
    }
    // can detach the head if points to a specific hash and no branch
    moveHead(name_or_hash){
        var branch = this.branches.find(branch => branch.name == name_or_hash)
        if(branch != null){
            this.head.currentPosition = branch.name
        }
        else{
            var commit = Object.keys(this.getGraph()).find(id => id == name_or_hash)
            console.log(commit)
            if(commit != null){
                this.head.currentPosition = commit
            }
            else{
                throw new Error("No branch nor commit equals to")
            }
        }
    }

    createBranch(name){
        var newBranch = new Branch(name, this.getHeadCurrentHash())
        this.branches.push(newBranch)
    } 
    createCommit(name){
        
        var after_id = this.getHeadCurrentHash()

        const next_commit = this.getRandomSha()
        this.graph[next_commit] = new Commit(name)
        
        this.appendCommit(after_id, next_commit)

        if(this.isHeadDetached()){
            this.moveHead(next_commit)
        }else{
            this.moveHeadWithBranch(next_commit)
        }
        
    }

    appendCommit(after_id, commit_id){
        this.graph[after_id].appendCommit(commit_id)
    } 

}
