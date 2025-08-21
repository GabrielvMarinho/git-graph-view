export default class FlagRequiresValueException extends Error{
    constructor(flag){
        super(`error: switch '${flag}' requires a value`)
    }
}