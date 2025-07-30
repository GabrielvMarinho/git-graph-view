export default class ValueNotFoundInCommand extends Error{
    constructor(){
        super(`Value could not be found in command`)
    }
}