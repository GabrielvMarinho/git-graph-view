export default class BranchNotFound extends Error{
    constructor(branch){
        super(`error: branch '${branch}' not found`)
    }
}