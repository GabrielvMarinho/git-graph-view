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
    
}