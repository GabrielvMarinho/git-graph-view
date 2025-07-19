export default class InvalidCommandException extends Error{
    constructor(){
        super("Command not found/implemented")
        this.name = "Invalid Command"
    }
}