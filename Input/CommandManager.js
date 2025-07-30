import InvalidReferenceForBranchCreationException from "../Errors/InvalidReferenceForBranchCreationException";
import GitObject from "../Structure/GitObject";

export default class CommandManager{
    gitObject = new GitObject()
    
    checkout(command){
        
        branchOrHash = command._arguments[command._arguments.length - 1]

        this.gitObject.updateCurrentHashOrBranchPointer(branchOrHash)
        if(this.gitObject.isBranch(branchOrHash)){
            return `Switched to branch '${branchOrHash}'`
        }
        return `Note: switching to ${branchOrHash}.\nYou are in 'detached HEAD' state`
        

    }
    checkoutCreateBranch(command){
        const steps = (branch, positionToGo) =>{
            this.gitObject.updateCurrentHashOrBranchPointer(positionToGo)
            this.gitObject.createBranch(branch)
            this.gitObject.updateCurrentHashOrBranchPointer(branch)
        }
        branch = command.extractValueFromFlag("-b")

        positionToGo = command.extractSecondValueFromFlag("-b")
        
        if(positionToGo){
            steps(branch, positionToGo)
            return `Switched to a new branch '${branch}'`
        }
        steps(branch, this.gitObject.getCurrentHash())
        return `Switched to a new branch '${branch}'` 
    }
    checkoutResetCreateBranch(command){
        const steps = (branch, positionToGo) =>{
            try{
                this.gitObject.updateCurrentHashOrBranchPointer(positionToGo)
            }catch{
                throw new InvalidReferenceForBranchCreationException(branch, positionToGo)
            }
            this.gitObject.deleteBranch(branch)
            this.gitObject.createBranch(branch)
            this.gitObject.updateCurrentHashOrBranchPointer(branch)
        }
        branch = command.extractValueFromFlag("-B")

        positionToGo = command.extractSecondValueFromFlag("-B")
        
        if(positionToGo){
            steps(branch, positionToGo)
            return `Reset branch '${branch}'`
        }
        if(this.gitObject.branchAlreadyExist(branch) && this.gitObject.getCurrentBranch().name==branch){
            // nothing happens, this is correct
            return `Reset branch '${branch}'`
        }
        if(this.gitObject.branchAlreadyExist(branch)){
            steps(branch, this.gitObject.getCurrentHash())
            return `Switched to and reset branch '${branch}'`
        }

        steps(branch, this.gitObject.getCurrentHash())
        return `Switched to a new branch '${branch}'`  
    }
 
   
    merge(command){
        hashOrBranchToMove = command.extractValueAfterWord("merge")
        if(this.gitObject.isMergeFastForward(hashOrBranchToMove)){
            return this.mergeFastForward(hashOrBranchToMove)
        }else{
            return this.mergeNotFastForward()
        }
    }
    mergeNotFastForward(hashOrBranchToMove){
        //to do
    }
    mergeFastForward(hashOrBranchToMove){
        var currentHash = this.gitObject.getCurrentHash()
        var hashToMerged = this.gitObject.getHashFrom(hashOrBranchToMove)
        this.gitObject.updateCurrentHashOrBranchPointerAndMoveBranch(hashToMerged)
        return `Updating ${currentHash.slice(0, 7)}..${hashToMerged.slice(0, 7)}\nFast-forward`
    }
    commit(command){        

        message = command.extractValueFromFlag("-m")

        this.gitObject.createCommit(message)
        

        var positionString = this.gitObject.getCurrentBranchAndHashString()  
        if(message){
            return `[${positionString}] ${message}`
        }else{
            return `[${positionString}]`
        }
        
    }

    
    getCurrentState(){
        return this.gitObject.getCurrentState()
    }
}
