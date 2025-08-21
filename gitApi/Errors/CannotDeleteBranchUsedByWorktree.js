

export default class CannotDeleteBranchUsedByWorktree extends Error{
    constructor(branch){
        super(`error: cannot delete branch '${branch}' used by worktree`)
    }
}