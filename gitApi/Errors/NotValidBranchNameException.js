
export default class NotValidBranchNameException extends Error{
    constructor(branchName){
        super(`fatal: '${branchName}' is not a valid branch name`)
    }
}