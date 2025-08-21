export default class NoBranchNorCommitHash extends Error{
    constructor(pathspec){
        super(`error: pathspec '${pathspec}' did not match any file(s) known to git`)
    }
}