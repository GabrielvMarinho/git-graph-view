export default class AmbigousArgument extends Error{
    constructor(ambigousArgument){
        super(`fatal: ambiguous argument '${ambigousArgument}': unknown revision or path not in the working tree.`)
    }
}