import Commit from "./Commit.js";
import crypto from "crypto"
import Head from "./Head.js";
import Branch from "./Branch.js";
export default class ObjectModel{
    
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
    // will update the head if the head points to a branch
    moveBranch(hash){
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
    createCommit(message){
        
        const parent_id = this.getHeadCurrentHash()

        const new_commit_sha = this.getRandomSha()
        this.graph[new_commit_sha] = new Commit(message, parent_id)
        

        if(this.isHeadDetached()){
            this.moveHead(new_commit_sha)
        }else{
            this.moveBranch(new_commit_sha)
        }
        
    }




}
