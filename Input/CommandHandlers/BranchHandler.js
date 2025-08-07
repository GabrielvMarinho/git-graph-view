export default class BranchHandler{
    constructor(gitObject){
        this.gitObject = gitObject
    }
    branch(command){
        return this.gitObject.getAllBranchesString()
    }
}