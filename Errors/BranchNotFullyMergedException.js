export default class BranchNotFullyMergedException extends Error{
    constructor(branch){
        super(`error: The branch '${branch}' is not fully merged.\nIf you are sure you want to delete it, run 'git branch -D ${branch}'`)
    }
}