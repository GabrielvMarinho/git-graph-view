export default class AlreadyUpToDate extends Error{
    constructor(){
        super("Already up to date.")
    }
}