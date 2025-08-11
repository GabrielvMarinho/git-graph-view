import BranchNotFound from "../../Errors/BranchNotFound"
import BranchNotFullyMergedException from "../../Errors/BranchNotFullyMergedException"
import NoBranchNorCommitHash from "../../Errors/NoBranchNorCommitHash"

export default class BranchHandler{
    constructor(gitObject){
        this.gitObject = gitObject
    }
    branch(command){
        branchName = command.extractValueAfterWord("branch")

        if(branchName){
            return this.gitObject.createBranch(branchName)        
        }
        else{
            return this.gitObject.getAllBranchesString()
        }
        
    }
    branchDelete(command){
        branchToDelete = command.extractValueFromFlag("-D")
        if(this.gitObject.isBranch(branchToDelete)){
            this.gitObject.deleteBranch(branchToDelete)
        }
        else{
            throw new BranchNotFound(branchToDelete)
        }
    }
    branchCheckDelete(command){
        branchToDelete = command.extractValueFromFlag("-d")
        if(this.gitObject.isBranch(branchToDelete)){
            if(this.gitObject.isSpecificCommitAnAncestorOfCurrentCommit(branchToDelete)){
                
                this.gitObject.deleteBranch(branchToDelete)
                
                return
            }else{
                throw new BranchNotFullyMergedException(branchToDelete)
            }
        }
        else{
            throw new BranchNotFound(branchToDelete)
        }
    }
}