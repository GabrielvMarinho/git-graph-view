export default class NotInABranchError extends Error{
    constructor(){
        super("Not in a branch currently")
    }
}