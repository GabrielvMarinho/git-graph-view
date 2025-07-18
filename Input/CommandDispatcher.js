import Command from "./Command"
import CommandManager from "./CommandManager"

export default class CommandDispatcher{
    
    validCommands = ["checkout", "commit"]
    commandManager = new CommandManager()

    receiveAndDispatchCommand(commandString){
        var command = new Command(commandString, this.validCommands)
        this[command.subcommand](command)
    }

    checkout(command){
        branchOrHash = command._arguments[command._arguments.length-1]
        if(command._arguments.includes("-b")){
            this.commandManager.checkoutAndCreateBranch(branchOrHash)
        }
        else if(command._arguments.includes("-B")){
            this.commandManager.checkoutAndCreateBranch(branchOrHash)
        }        
    }


    
    
}