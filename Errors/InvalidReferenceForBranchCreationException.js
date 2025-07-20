export default class InvalidReferenceForBranchCreationException extends Error{
    constructor(branch, positionToGo){
        super(`fatal: '${positionToGo}' is not a commit and a branch '${branch}' cannot be created from it`)
    }
}