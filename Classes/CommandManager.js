import GitObject from "./GitObject";

export default class CommandManager{
    gitObject = new GitObject()
    
    checkout(branchOrHash){
        this.gitObject.updateCurrentPosition(branchOrHash)
    }

    commit(message){
        return this.gitObject.createCommit(message)
    }


    getCurrentState(){
        return this.gitObject.getCurrentState()
    }
}
