import InvalidReferenceForBranchCreationException from "../Errors/InvalidReferenceForBranchCreationException";
import GitObject from "../Structure/GitObject";

export default class CommandManager{
    gitObject = new GitObject()
    
    checkout(branchOrHash){
        return this.gitObject.updateCurrentPosition(branchOrHash)
    }
    checkoutAndCreateBranch(command){
        branch = command.extractValueFromFlag("-b")
        this.gitObject.createBranch(branch)
        this.gitObject.updateCurrentPosition(branch)
        return `Switched to a new branch '${branch}'`
    }
    resetBranchToPosition(branch, positionToGo){
        try{
            this.gitObject.updateCurrentPosition(positionToGo)
        }catch{
            throw new InvalidReferenceForBranchCreationException(branch, positionToGo)
        }
        this.gitObject.deleteBranch(branch)

        this.gitObject.createBranch(branch)
        this.gitObject.updateCurrentPosition(branch)

    }
    checkoutAndCreateBranchIfExistsReset(command){
        branch = command.extractValueFromFlag("-B")
        positionToGo = command.extractSecondValueFromFlag("-B")
        if(positionToGo){
            this.resetBranchToPosition(branch, positionToGo)
            return `Reset branch '${branch}'`
        }
        if(this.gitObject.branchAlreadyExist(branch) && this.gitObject.getCurrentBranch().name==branch){
            // nothing happens, this is correct
            return `Reset branch '${branch}'`
        }
        if(this.gitObject.branchAlreadyExist(branch)){
            this.resetBranchToPosition(branch, this.gitObject.getCurrentHash())
            return `Switched to and reset branch '${branch}'`
        }

        this.resetBranchToPosition(branch, this.gitObject.getCurrentHash())
        return `Switched to a new branch '${branch}'`   
        
        
    }
   
    commit(command){
        message = command.extractValueFromFlag("-m")

        var sha = this.gitObject.createCommit(message)
        var positionString = this.gitObject.getCurrentBranchAndHashString()  
        return `[${positionString}] ${message}`
    }

    
    getCurrentState(){
        return this.gitObject.getCurrentState()
    }
}
