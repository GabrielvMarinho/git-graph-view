import FlagRequiresValueException from "../Errors/FlagRequiresValueException.js";
import InvalidCommandException from "../Errors/InvalidCommandException.js";
import stringArgv from 'string-argv';

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

    extractValueAfterFlag(flag){
        
        const index = this._arguments.indexOf(flag);
        if (index !== -1) {
            let value = this._arguments[index + 1] 

            if(!value){
                throw new FlagRequiresValueException(flag)
            }

            return value
            
        }
        return null;
    }

    extractValueAfterOneWordIgnoringDash(word){
        const index = this._arguments.indexOf(word);
        if (index === -1) return null;
        let i = index + 1;
        while (i < this._arguments.length && this._arguments[i].startsWith('-')) {
            i++;
        }
        if (i >= this._arguments.length) return null;
        return this._arguments[i];
    }
    extractValueAfterTwoWordsIgnoringDash(word){
        const index = this._arguments.indexOf(word);
        if (index === -1) return null;
        let i = index + 1;
        while (i < this._arguments.length && this._arguments[i].startsWith('-')) {
            i++;
        }
        if (i >= this._arguments.length) return null;

        i++; 
        while (i < this._arguments.length && this._arguments[i].startsWith('-')) {
            i++;
        }
        if (i >= this._arguments.length) return null;

        return this._arguments[i];
    }
    
    hasFlag(...flags){
        let found = false
        flags.forEach(flag =>{
            const index = this._arguments.indexOf(flag);
            if(index>=0){
                found = true
            }
        })
        return found
    }

}