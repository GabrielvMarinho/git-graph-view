import Commit from "./Commit.js";
import crypto from "crypto"
import Head from "./Head.js";
import Branch from "./Branch.js";
export default class ObjectModel{
    
    constructor(){
        var firstSha = this.getRandomSha()
        // always start with a commit
        this.graph = {[firstSha]:new Commit("First commit")}
        //default and only branch being master
        var master = new Branch("master", firstSha)
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
    // return the hash from the branch or just the sent value 
    getHashFrom(branchOrHash){
        var commit = Object.keys(this.getGraph()).find(id => id == hash)
        if(commit != null){
            var branch = this.branches.find(branch => this.head.currentPosition == branch.name)
            return branch.currenHash
        }
        else{
            return branchOrHash
        }
    }
    
    moveCurrentPosition(branchOrHash){
        var branch = this.branches.find(branch => branch.name == branchOrHash)
        if(branch){
            this.head.currentPosition = branch.name
        }
        else{
            var commitHash = Object.keys(this.getGraph()).find(id => id == branchOrHash)
            if(commitHash){
                this.head.currentPosition = commitHash
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

    createMergeCommit(message, branchOrHashToMerge){
        const currentHash = this.getHeadCurrentHash()
        const hashToMerge = this.getHashFrom(branchOrHashToMerge)
        
        const newCommitSha = this.getRandomSha()
        this.graph[newCommitSha] = new Commit(message, currentHash, hashToMerge)
        
        this.moveCurrentPosition(newCommitSha)

    }
 
    createCommit(message){
        
        const currentHash = this.getHeadCurrentHash()

        const newCommitSha = this.getRandomSha()
        this.graph[newCommitSha] = new Commit(message, currentHash)
        

        this.moveCurrentPosition(newCommitSha)
    }




}
