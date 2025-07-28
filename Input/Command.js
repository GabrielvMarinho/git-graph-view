import FlagRequiresValueException from "../Errors/flagRequiresValueException";
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
    extractValueInPosition(index){
        // no impl
    }
    extractValueFromFlag(flag){
        const index = this._arguments.indexOf(flag);
        if (index !== -1) {
            value = this._arguments[index + 1] 

            if(!value){
                throw new FlagRequiresValueException(flag)
            }

            return value
            
        }
        return null;
    }
    extractSecondValueFromFlag(flag){
        const index = this._arguments.indexOf(flag);
        if (index !== -1) {
            value = this._arguments[index + 2] 

            return value
        }
        return null;
    }
}