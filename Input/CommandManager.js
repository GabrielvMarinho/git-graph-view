import GitObject from "../Structure/GitObject";

export default class CommandManager{
    gitObject = new GitObject()
    
    checkout(branchOrHash){
        this.gitObject.updateCurrentPosition(branchOrHash)
    }
    checkoutAndCreateBranch(branch){
        this.gitObject.createBranch(branch)
        this.gitObject.updateCurrentPosition(branch)
    }
    checkoutAndCreateBranchIfExistsReset(branch){
        this.gitObject.deleteBranch(branch)
        this.checkoutAndCreateBranch(branch)
    }

    commit(message){
        return this.gitObject.createCommit(message)
    }


    getCurrentState(){
        return this.gitObject.getCurrentState()
    }
}
