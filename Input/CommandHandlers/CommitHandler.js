
export default class CommitHandler{

    constructor(gitObject){
        this.gitObject = gitObject
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
}