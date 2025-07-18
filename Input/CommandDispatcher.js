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
        const flagFunctions = {
            "-b": () => this.commandManager.checkoutAndCreateBranch(command),
            "-B": () => this.commandManager.checkoutAndCreateBranchIfExistsReset(command),
        }
        if(command._arguments.length == 0){
            this.commandManager.checkout()
        }else{
            command._arguments.forEach(flag =>{
                if(flagFunctions[flag]){
                    flagFunctions[flag]()
                }
            })
        }
    }
    commit(command){
       
        const flagFunctions ={
            "-m": () => this.commandManager.commitWithMessage(command)
        } 
        if(command._arguments.length == 0){
            this.commandManager.commit()
        }else{
            command._arguments.forEach(flag =>{
            if(flagFunctions[flag]){
                flagFunctions[flag]()
                }
            })
        }
        
    }







    
    
}