export default class NoBranchNamed extends Error{
    constructor(branch){
        super(`fatal: no branch named '${branch}'`)
    }
}