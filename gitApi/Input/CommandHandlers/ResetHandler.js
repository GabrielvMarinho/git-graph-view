import AmbigousArgument from "../../Errors/AmbigousArgument.js"

export default class ResetHandler{
    constructor(gitObject){
        this.gitObject = gitObject
    }
    reset(command){
        let hashOrBranch = command.extractValueAfterOneWordIgnoringDash("reset")
        try{
            const hashToReset = this.gitObject.getHashFrom(hashOrBranch)
            this.gitObject.updateCurrentHashOrBranchPointerToHash(hashToReset)

        }catch(e){
            throw new AmbigousArgument(hashOrBranch)
        }
    }
}