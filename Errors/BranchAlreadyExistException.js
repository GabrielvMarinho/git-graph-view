export default class BranchAlreadyExistException extends Error{
    constructor(branchName){
        super(`fatal: a branch named '${branchName}' already exists`)
    }
}