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
        const defaultFunction = () => this.commandManager.checkout(command)
        return this.executeAllFlags(command, flagFunctions, defaultFunction);
    }
    merge(command){
        const flagFunctions = {
            "--squash": () => this.commandManager.mergeSquash(command),
        }
        
        const defaultFunction = () => this.commandManager.merge(command)

        return this.executeAllFlags(command, flagFunctions, defaultFunction);
    }
    commit(command){
        return this.commandManager.commit(command)
    }

    executeAllFlags(command, flagFunctions, defaultFunction){
        for (const flag of command._arguments) {
            if (flagFunctions[flag]) {
                return flagFunctions[flag]();  
            }
        }
        return defaultFunction()
    }


}