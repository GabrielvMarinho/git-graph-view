import BranchNotFound from "../../Errors/BranchNotFound"
import BranchNotFullyMergedException from "../../Errors/BranchNotFullyMergedException"
import NoBranchNorCommitHash from "../../Errors/NoBranchNorCommitHash"

export default class BranchHandler{
    constructor(gitObject){
        this.gitObject = gitObject
    }
    branch(command, hideMessage=false){
        branchName = command.extractValueAfterOneWordIgnoringDash("branch")

        if(branchName){
            return this.gitObject.createBranch(branchName)        
        }
        else{
            return this.gitObject.getAllBranchesString()
        }
        
    }
    branchDelete(command, hideMessage=false){
        branchToDelete = command.extractValueAfterFlag("-D") || command.extractValueAfterOneWordIgnoringDash("--force") 
        if(this.gitObject.isBranch(branchToDelete)){
            let hash = this.gitObject.getHashFrom(branchToDelete)
            this.gitObject.deleteBranch(branchToDelete)
            if(hideMessage){
                return
            }
            return `Deleted branch ${branchToDelete} (was ${hash.slice(0, 7)})`
        }
        else{
            throw new BranchNotFound(branchToDelete)
        }
    }
    
    branchCheckDelete(command, hideMessage=false){
        let returnString
        if(command.hasFlag("--force")){
            returnString= this.branchDelete(command, hideMessage)
        }
        branchToDelete = command.extractValueAfterFlag("-d") || command.extractValueAfterFlag("--delete") 
                
        if(this.gitObject.isBranch(branchToDelete)){
            if(this.gitObject.isSpecificCommitAnAncestorOfCurrentCommit(branchToDelete)){
                let hash = this.gitObject.getHashFrom(branchToDelete)

                this.gitObject.deleteBranch(branchToDelete)
                
                returnString= `Deleted branch ${branchToDelete} (was ${hash.slice(0, 7)})`
            }else{
                throw new BranchNotFullyMergedException(branchToDelete)
            }
        }
        else{
            throw new BranchNotFound(branchToDelete)
        }
        if(hideMessage){
            return
        }else{
            return returnString
        }
    }
}