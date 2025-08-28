export default class ResetHandler{
    constructor(gitObject){
        this.gitObject = gitObject
    }
    reset(command){
        const hashToReset = this.gitObject.getHashFrom(command.extractValueAfterOneWordIgnoringDash("reset"))
        this.gitObject.updateCurrentHashOrBranchPointerToHash(hashToReset)
    }
}