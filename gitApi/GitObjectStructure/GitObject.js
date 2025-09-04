import Commit from "./Commit.js";
import Head from "./Head.js";
import Branch from "./Branch.js";
import BranchAlreadyExistException from "../Errors/BranchAlreadyExistException.js";
import NoBranchNorCommitHash from "../Errors/NoBranchNorCommitHash.js";
import { isValidBranchName } from "../utils.js";
import NotValidBranchNameException from "../Errors/NotValidBranchNameException.js"
import CannotDeleteBranchUsedByWorktree from "../Errors/CannotDeleteBranchUsedByWorktree.js";
import NoBranchNamed from "../Errors/NoBranchNamed.js";

export default class GitObject{
    
    constructor(uiManager){
        var firstSha = this.getRandomSha()
        // always start with a commit
        this.graph = {[firstSha]:new Commit("First commit")}
        //default and only branch being main
        var main = new Branch("main", firstSha)
        this.head = new Head(main.getName())
        this.branches = [main]
        this.uiManager = uiManager
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
        
        var branch = this.getCurrentBranch()
        
        if(branch){
            return `${position} ${branch.currentHash.slice(0, 7)}`
        }
        else{
            return `detached HEAD ${position}`
        }
        
        
        
    }
    getGraph(){
        return this.graph
    }
    isHeadDetached(){
        var branch = this.getCurrentBranch()
        if(!branch){
            return true
        }
        return false
    }
    getBranch(branchName){
        var branch = this.branches.find(branch => branch.name == branchName)
        if(branch != null){
            return branch
        }
        else{
            return null
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
    isSpecificCommitAnAncestorOfCurrentCommit(branchOrHash){
        const graph = this.getGraph()
        
        var hashToCheck = this.getHashFrom(branchOrHash)
        
        var ancestors = [this.getCurrentHash()]
        var position = 0
        var currentHash = ancestors[position]
        do{
            
            // Means the current commit is an ancestor
            if(currentHash == hashToCheck){
                    return true
            }
            else{
                for(let i = 0; i<graph[currentHash].parents.length; i++ ){
                    ancestors.push(graph[currentHash].parents[i])
                }
                
            }
            position++
            currentHash = ancestors[position]

        }while(currentHash)
        
        return false
    }
    isCurrentCommitAnAncestorOf(branchOrHash){
        const graph = this.getGraph()
        
        var currentHash = this.getCurrentHash()
        
        var ancestors = [this.getHashFrom(branchOrHash)]
        var position = 0
        var hashToCheck = ancestors[position]
        do{
            
            // Means the current commit is an ancestor
            if(hashToCheck == currentHash && position !=0){
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
        const hexChars = '0123456789abcdef';
        let result = '';

        for (let i = 0; i < 20 * 2; i++) {
        const rand = Math.floor(Math.random() * 16);
        result += hexChars[rand];
        }
        return result;
    }
    getCurrentBranch(){
        var branch = this.branches.find(branch => branch.name == this.head.currentPosition) 
        if(branch){
            return branch
        }
        return null
         
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
        var hash = Object.keys(this.getGraph()).find(id => id.startsWith(branchOrHash))
        if(hash == null){
            var branch = this.branches.find(branch => branch.name == branchOrHash)
            return branch.currentHash
        }
        else{
            return hash
        }
    }
    // changes the current position to either a hash or if its a branch name, changes the branch hash
    updateCurrentHashOrBranchPointerToHash(hash){
        let currentPosition = this.head.currentPosition
        var branch = this.branches.find(branch => branch.name == currentPosition)
        if(branch){  
            branch.currentHash = hash
            if(this.uiManager){
                this.uiManager.updateCurrentCoordinatesToCommit(hash)
                this.uiManager.updatePointers(this.getCurrentState())
            }
        }
        else{
            var commitExists = Object.keys(this.getGraph()).find(id => id == hash)
            if(commitExists){
                this.head.currentPosition = hash
                if(this.uiManager){
                    this.uiManager.updateCurrentCoordinatesToCommit(hash)
                    this.uiManager.updatePointers(this.getCurrentState())
                }
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
            var commitHash = this.getCurrentHash()
            if(this.uiManager){
                this.uiManager.updateCurrentCoordinatesToCommit(commitHash)
                this.uiManager.updatePointers(this.getCurrentState())
            }
            return
        }
        else{
            var commitHash = Object.keys(this.getGraph()).find(id => id.startsWith(branchOrHash))
            if(commitHash){
                this.head.currentPosition = commitHash
                if(this.uiManager){
                    this.uiManager.updateCurrentCoordinatesToCommit(commitHash)
                    this.uiManager.updatePointers(this.getCurrentState())
                }
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
    renameBranch(branchName, newName){
        if(!isValidBranchName(branchName)){
            throw new NotValidBranchNameException(branchName);
        }
        if(newName){
            if(!this.branchAlreadyExist(branchName)){
                throw new NoBranchNamed(branchName);
            }
            if(!isValidBranchName(newName)){
                throw new NotValidBranchNameException(newName);
            }
            if(this.branchAlreadyExist(newName)){
                throw new BranchAlreadyExistException(newName)
            }
            
            let branchToChange = this.getBranch(branchName)
            
            if(branchName ==this.getCurrentBranch().name){
                branchToChange.name = newName
                this.updateCurrentHashOrBranchPointer(newName)
            }else{
                branchToChange.name = newName
            }
        }
        else{
            if(this.branchAlreadyExist(branchName)){
                throw new BranchAlreadyExistException(branchName)
            }else{
                let currentBranch = this.getCurrentBranch()
                currentBranch.name = branchName
                this.updateCurrentHashOrBranchPointer(branchName)
            }
        }
        if(this.uiManager){
            this.uiManager.updatePointers(this.getCurrentState())
        }
        return
        
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
        if(this.uiManager){
            this.uiManager.updatePointers(this.getCurrentState())
        }
    } 
    deleteBranch(name, force=false){    
        var branch = this.getCurrentBranch()
        if((branch && branch.name != name) || force){
            var index = this.branches.findIndex(branchObj => branchObj.name == name)
            if(index !== -1){
                this.branches.splice(index, 1)
            }
        }
        else{
            throw new CannotDeleteBranchUsedByWorktree(name)
        }
        if(this.uiManager){
            this.uiManager.updatePointers(this.getCurrentState())
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
        if(this.uiManager){
            this.uiManager.createCommit(newCommitSha, currentHash, message)
        }
        this.updateCurrentHashOrBranchPointerToHash(newCommitSha)
        return newCommitSha
    }
    getAlphabeticalOrderedBranchArray(){
        return this.branches.sort((a, b) =>{
            let aName = a.getName()
            let bName = b.getName()
            return aName>bName ? 1 : aName<bName ? -1 : 0
        })
    }
    getAllBranchesString(){
        let branchesString = ""
        if(this.isHeadDetached()){
            branchesString = `* (HEAD detached at ${this.getCurrentHash().slice(0, 7)})\n`
        }
        const alphabeticalOrderedArray = this.getAlphabeticalOrderedBranchArray()
        alphabeticalOrderedArray.forEach(branch =>{
            if(this.getCurrentBranch() == branch){
                branchesString = branchesString+"* "
            }
            else{
                branchesString = branchesString+"  "
            }
            branchesString = branchesString+branch.name+"\n"
        })
        branchesString = branchesString.substring(0, branchesString.length-1)
        return branchesString
    }

}
