import GitObject from "./GitObject";

export default class CommandManager{
    gitObject = new GitObject()
    commit(message){
        return this.gitObject.createCommit(message)
    }
    getGraph(){
        return this.gitObject.getGraph()
    }
}
