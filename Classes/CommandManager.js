import GitObject from "./GitObject";

export default class CommandManager{
    gitObject = new GitObject()
    
    checkout(branchOrHash){
        
    }

    commit(message){
        return this.gitObject.createCommit(message)
    }


    getCurrentState(){
        return this.gitObject.getCurrentState()
    }
}
