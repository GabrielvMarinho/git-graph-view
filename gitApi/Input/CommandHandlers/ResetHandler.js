export default class ResetHandler{
    constructor(gitObject){
        this.gitObject = gitObject
    }
    reset(command){
        hashToReset = this.gitObject.getHashFrom(command.extractValueAfterOneWordIgnoringDash("reset"))
        this.gitObject.updateCurrentHashOrBranchPointerToHash(hashToReset)
    }
}