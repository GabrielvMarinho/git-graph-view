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
        return `Switched to a new branch ${branch}`
    }
    checkoutAndCreateBranchIfExistsReset(command){
        branch = command.extractValueFromFlag("-B")
        if(this.gitObject.branchAlreadyExist(branch)){
            return this.checkoutAndCreateBranch(command)
        }
        else{
            this.gitObject.deleteBranch(branch)
            this.checkoutAndCreateBranch(branch)
            return `Switched to and reset branch  ${branch}`   
        }
        
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
