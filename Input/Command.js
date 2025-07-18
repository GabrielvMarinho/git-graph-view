import InvalidCommand from "../Errors/InvalidCOmmand"

export default class Command{
    
    
    
    constructor(commandString, validCommands){
        var _arguments = commandString.split(" ")
        var subcommand = _arguments[1]
        if(_arguments[0] == ("git") && validCommands.includes(subcommand)){
            this.subcommand = subcommand
            this._arguments = _arguments.slice(2)
        }else{
            throw new InvalidCommand("Invalid syntax, command not found")
        }
    }
}