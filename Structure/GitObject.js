import Commit from "./Commit.js";
import crypto from "crypto"
import Head from "./Head.js";
import Branch from "./Branch.js";
import BranchAlreadyExistException from "../Errors/BranchAlreadyExistException.js";
import NoBranchNorCommitHash from "../Errors/NoBranchNorCommitHash.js";
import { isValidBranchName } from "../utils.js";
import NotValidBranchNameException from "../Errors/NotValidBranchNameException"
import InvalidReferenceForBranchCreationException from "../Errors/InvalidReferenceForBranchCreationException.js";
import NotInABranchError from "../Errors/NotInABranchError.js";

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
        var position = this.head.currentPosition.slice(0, 7)
        try{
            var branch = this.getCurrentBranch()
            if(branch && branch.name){
                return `${position} ${branch.currentHash.slice(0, 7)}`
            }
        }catch(e){
            return `detached HEAD ${position}`
        }
        
    }
    getGraph(){
        return this.graph
    }
    isHeadDetached(){
        try{
            this.getCurrentBranch()
            return false
        }catch(e){
            return true
        }
    }
    isBranch(branchOrHash){
        var branch = this.branches.find(branch => branch.name == branchOrHash)
        if(branch != null){
            return true
        }
        else{
            return false
        }
    }
    isMergeFastForward(branchToMerge){
        const graph = this.getGraph()
        
        var currentHash = this.getCurrentHash()
        
        var ancestors = [this.getHashFrom(branchToMerge)]
        var position = 0
        var hashToCheck = ancestors[position]
        do{
            
            // Means the current commit is an ancestor of the place to merge
            if(hashToCheck == currentHash){
                return true
            }
            else{
                for(let i = 0; i<graph[hashToCheck].parents.length; i++ ){
                    ancestors.push(graph[hashToCheck].parents[i])
                }
            }
            position++
            hashToCheck = ancestors[position]

            
        }while(hashToCheck)
        
        return false
    }
    getRandomSha(){
        return crypto.randomBytes(20).toString("hex");
    }
    getCurrentBranch(){
        var branch = this.branches.find(branch => branch.name == this.head.currentPosition) 
        if(branch){
            return branch
        }
        throw new NotInABranchError()
         
    }
    getCurrentHash(){
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
        var hash = Object.keys(this.getGraph()).find(id => id == branchOrHash)
        if(hash == null){
            var branch = this.branches.find(branch => branch.name == branchOrHash)
            return branch.currentHash
        }
        else{
            return branchOrHash
        }
    }
    // changes the current position to either a hash or if its a branch name, changes the branch hash
    updateCurrentHashOrBranchPointerToHash(hash){
        currentPosition = this.head.currentPosition
        var branch = this.branches.find(branch => branch.name == currentPosition)
        if(branch){
            
            branch.currentHash = hash
        }
        else{
            
            var commitHash = Object.keys(this.getGraph()).find(id => id == hash)
            if(commitHash){
                this.head.currentPosition = commitHash
            }
            else{
                throw new Error("No branch nor commit equals to")
            }
        }   
    }
    // changes the current position to either a hash or branch name, doesnt change the actual position
    updateCurrentHashOrBranchPointer(branchOrHash){
        var branch = this.branches.find(branch => branch.name == branchOrHash)
        if(branch){
            this.head.currentPosition = branch.name
            return

        }
        else{
            var commitHash = Object.keys(this.getGraph()).find(id => id.startsWith(branchOrHash))
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
        var newBranch = new Branch(name, this.getCurrentHash())
        
        this.branches.push(newBranch)
        
    } 
    deleteBranch(name){

        var index = this.branches.findIndex(branchObj => branchObj.name == name)
        if(index !== -1){
            this.branches.splice(index, 1)
        }
        
        
    }

    createMergeCommit(message, hashTomerge){
        const currentHash = this.getCurrentHash()
        const newCommitSha = this.getRandomSha()
        const newCommit = new Commit(message, currentHash, hashTomerge)
        this.graph[newCommitSha] = newCommit
        this.updateCurrentHashOrBranchPointerToHash(newCommitSha)
        return newCommitSha
    }
    createCommit(message){
        const currentHash = this.getCurrentHash()
        const newCommitSha = this.getRandomSha()
        const newCommit = new Commit(message, currentHash)
        this.graph[newCommitSha] = newCommit
        this.updateCurrentHashOrBranchPointerToHash(newCommitSha)
        return newCommitSha
    }
    




}
