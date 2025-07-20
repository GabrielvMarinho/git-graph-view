import InvalidReferenceForBranchCreationException from "../Errors/InvalidReferenceForBranchCreationException";
import GitObject from "../Structure/GitObject";

export default class CommandManager{
    gitObject = new GitObject()
    
    checkout(branchOrHash){
        return this.gitObject.updateCurrentPosition(branchOrHash)
    }
    checkoutCreateBranch(command){
        const steps = (branch, positionToGo) =>{
            this.gitObject.updateCurrentPosition(positionToGo)
            this.gitObject.createBranch(branch)
            this.gitObject.updateCurrentPosition(branch)
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
                this.gitObject.updateCurrentPosition(positionToGo)
            }catch{
                throw new InvalidReferenceForBranchCreationException(branch, positionToGo)
            }
            this.gitObject.deleteBranch(branch)
            this.gitObject.createBranch(branch)
            this.gitObject.updateCurrentPosition(branch)
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
