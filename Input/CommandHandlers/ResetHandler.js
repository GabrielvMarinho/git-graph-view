export default class ResetHandler{
    constructor(gitObject){
        this.gitObject = gitObject
    }
    reset(command){
        hashToReset = this.gitObject.getHashFrom(command.extractValueAfterWord("reset"))
        this.gitObject.updateCurrentHashOrBranchPointerToHash(hashToReset)
    }
}