
export default class CommitHandler{

    constructor(gitObject){
        this.gitObject = gitObject
    }
    commit(command, hideMessage=false){     
        message = command.extractValueAfterFlag("-m")
        this.gitObject.createCommit(message)
        let returnString
        var positionString = this.gitObject.getCurrentBranchAndHashString()  
        if(message){
            returnString = `[${positionString}] ${message}`
        }else{
            returnString = `[${positionString}]`
        }

        if(hideMessage){
            return 
        }
        else{
            return returnString
        }
        
    }
}