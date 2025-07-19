import Commit from "./Commit.js";
import crypto from "crypto"
import Head from "./Head.js";
import Branch from "./Branch.js";
import BranchAlreadyExistException from "../Errors/BranchAlreadyExistException.js";
import NoBranchNorCommitHash from "../Errors/NoBranchNorCommitHash.js";
import { isValidBranchName } from "../utils.js";
import NotValidBranchNameException from "../Errors/NotValidBranchNameException"

export default class GitObject{
    
    constructor(){
        var firstSha = this.getRandomSha()
        // always start with a commit
        this.graph = {[firstSha]:new Commit("First commit")}
        //default and only branch being main
        var main = new Branch("main", firstSha)
        this.head = new Head(main.getName())
        
        this.branches = [main]
    }

    getCurrentState(){
        return {
            "graph":this.graph,
            "branches":this.branches,
            "head":this.head,
        }
        
    }

    getCurrentBranchAndHashString(){
        var position = this.head.currentPosition 
        var branch = this.branches.find(branch => branch.name == this.head.currentPosition)
        if(branch.name){
            return `${position} ${branch.currentHash}`
        }
        return `${position}`
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
            return branch.currentHash
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
            return branch.currentHash
        }
        else{
            return branchOrHash
        }
    }
    // changes the current position to either a hash or if its a branch name, changes the branch hash
    updateCurrentPositionAndMoveBranch(branchOrHash){
        currentPosition = this.head.currentPosition
        var branch = this.branches.find(branch => branch.name == currentPosition)
        if(branch){
            
            branch.currentHash = branchOrHash
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
    // changes the current position to either a hash or branch name, doesnt change the actual position
    updateCurrentPosition(branchOrHash){
        var branch = this.branches.find(branch => branch.name == branchOrHash)
        if(branch){
            this.head.currentPosition = branch.name
            return

        }
        else{
            var commitHash = Object.keys(this.getGraph()).find(id => id == branchOrHash)
            if(commitHash){
                this.head.currentPosition = commitHash
                return 
            }
            else{
                throw new NoBranchNorCommitHash(branchOrHash)
            }
        }
    }
    branchAlreadyExist(name){
        return Object.values(this.branches).some(branchObj => branchObj.name == name)
    }
    createBranch(name){
        if(!isValidBranchName(name)){
            throw new NotValidBranchNameException(name);
        }
        if(this.branchAlreadyExist(name)){
            throw new BranchAlreadyExistException(name)
        }
        var newBranch = new Branch(name, this.getHeadCurrentHash())
        
        this.branches.push(newBranch)
        
    } 
    deleteBranch(name){
        var branchObj = this.branches.find(branchObj => branchObj.name == name)
        this.branches.splice(branchObj, 1)
    }

    
    createCommit(message){
        
        const currentHash = this.getHeadCurrentHash()

        const newCommitSha = this.getRandomSha()
        const newCommit = new Commit(message, currentHash)
        this.graph[newCommitSha] = newCommit
        this.updateCurrentPositionAndMoveBranch(newCommitSha)
        return newCommitSha
    }
    




}
