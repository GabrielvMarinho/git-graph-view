export default class InvalidCommand extends Error{
    constructor(message){
        super(message)
        this.name = "Invalid Command"
    }
}