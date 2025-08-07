import FlagRequiresValueException from "../Errors/flagRequiresValueException";
import InvalidCommandException from "../Errors/InvalidCommandException";
import stringArgv from 'string-argv';
import ValueNotFoundInCommand from "../Errors/ValueNotFoundInCommand";

export default class Command{

    constructor(commandString, validCommands){
        const _arguments = stringArgv(commandString);
        var subcommand = _arguments[1]
        if(_arguments[0] == ("git") && validCommands.includes(subcommand)){
            this.subcommand = subcommand
            this._arguments = _arguments.slice(1)
        }else{
            throw new InvalidCommandException()
        }
    }
    extractValueAfterWord(word){
        var index = this._arguments.indexOf(word)
        if(this._arguments[index]){
            while(index < this._arguments.length){
                if(!this._arguments[index].startsWith("-") && this._arguments[index] != word){
                    return this._arguments[index]
                }
                index++
            }

                throw new ValueNotFoundInCommand() 
        }
        else{
            throw new ValueNotFoundInCommand()
        }
        
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