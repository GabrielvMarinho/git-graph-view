import InvalidCommandException from "../Errors/InvalidCommandException";
import stringArgv from 'string-argv';

export default class Command{
    
    
    
    constructor(commandString, validCommands){
        const _arguments = stringArgv(commandString);
        var subcommand = _arguments[1]
        if(_arguments[0] == ("git") && validCommands.includes(subcommand)){
            this.subcommand = subcommand
            this._arguments = _arguments.slice(2)
        }else{
            throw new InvalidCommandException()
        }
    }

    extractValueFromFlag(_arguments, flag){
        const index = _arguments.indexOf(flag);
        if (index !== -1 && index + 1 < _arguments.length) {
            return _arguments[index + 1];
        }
        return null;
    }
}