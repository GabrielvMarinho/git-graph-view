import Command from "./Command"
import CommandManager from "./CommandManager"

export default class CommandDispatcher{
    
    validCommands = ["checkout", "commit"]
    commandManager = new CommandManager()

    receiveAndDispatchCommand(commandString){
        var command = new Command(commandString, this.validCommands)
        return this[command.subcommand](command)
    }

    checkout(command){
        const flagFunctions = {
            "-b": () => this.commandManager.checkoutCreateBranch(command),
            "-B": () => this.commandManager.checkoutResetCreateBranch(command),
        }
        const defualtFunction = () => this.commandManager.checkout(command)
        return this.executeAllFlags(command, flagFunctions, defualtFunction);
    }
    merge(command){
        const flagFunctions = {
            "--squash": () => this.commandManager.mergeSquash(command),
        }
        
        const defualtFunction = () => this.commandManager.merge(command)

        return this.executeAllFlags(command, flagFunctions, defualtFunction);
    }
    commit(command){
        return this.commandManager.commit(command)
    }

    executeAllFlags(command, flagFunctions, defualtFunction){
        for (const flag of command._arguments) {
            if (flagFunctions[flag]) {
                return flagFunctions[flag]();  
            }
        }
        return defualtFunction()
    }


}