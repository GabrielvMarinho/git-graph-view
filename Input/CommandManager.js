import GitObject from "../Structure/GitObject";

export default class CommandManager{
    gitObject = new GitObject()
    
    checkout(branchOrHash){
        this.gitObject.updateCurrentPosition(branchOrHash)
    }
    checkoutAndCreateBranch(command){
        branch = command._arguments[command._arguments.length-1]

        this.gitObject.createBranch(branch)
        this.gitObject.updateCurrentPosition(branch)
    }
    checkoutAndCreateBranchIfExistsReset(branch){
        branch = command._arguments[command._arguments.length-1]

        this.gitObject.deleteBranch(branch)
        this.checkoutAndCreateBranch(branch)
    }
    commitWithMessage(command){
        message = command.extractValueFromFlag(command._arguments, "-m")
        return this.gitObject.createCommit(message)
    }
    commit(){
        return this.gitObject.createCommit()
    }


    getCurrentState(){
        return this.gitObject.getCurrentState()
    }
}
