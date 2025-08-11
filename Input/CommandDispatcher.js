import CheckoutHandler from "./CommandHandlers/CheckoutHandler"
import Command from "./Command"
import CommitHandler from "./CommandHandlers/CommitHandler"
import MergeHandler from "./CommandHandlers/MergeHandler"
import ResetHandler from "./CommandHandlers/ResetHandler"
import BranchHandler from "./CommandHandlers/BranchHandler"

export default class CommandDispatcher{
    
    validCommands = ["checkout", "commit", "merge", "reset", "branch"]
    constructor(gitObject){
        this.gitObject = gitObject
        this.checkoutHandler = new CheckoutHandler(gitObject)
        this.commitHandler = new CommitHandler(gitObject)
        this.branchHandler = new BranchHandler(gitObject)
        this.resetHandler = new ResetHandler(gitObject)
        this.mergeHandler = new MergeHandler(gitObject)
    }
    receiveAndDispatchCommand(commandString){
        var command = new Command(commandString, this.validCommands)
        return this[command.subcommand](command)
    }
   
    branch(command){
        const flagFunctions = {
            "-d": () => this.branchHandler.branchCheckDelete(command),
            "-D": () => this.branchHandler.branchDelete(command),
        }
        const defaultFunction = () => this.branchHandler.branch(command)
        return this.executeAllFlags(command, flagFunctions, defaultFunction)
    }
    checkout(command){
        const flagFunctions = {
            "-b": () => this.checkoutHandler.checkoutCreateBranch(command),
            "-B": () => this.checkoutHandler.checkoutResetCreateBranch(command),
        }
        const defaultFunction = () => this.checkoutHandler.checkout(command)
        return this.executeAllFlags(command, flagFunctions, defaultFunction);
    }
    merge(command){
        const flagFunctions = {
            "--squash": () => this.mergeHandler.mergeSquash(command),
        }
        
        const defaultFunction = () => this.mergeHandler.merge(command)

        return this.executeAllFlags(command, flagFunctions, defaultFunction);
    }
    commit(command){
        return this.commitHandler.commit(command)
    }

    reset(command){
        return this.resetHandler.reset(command)
    }

    executeAllFlags(command, flagFunctions, defaultFunction, emptyStringReturn=false){
        for (const flag of command._arguments) {
            if (flagFunctions[flag]) {
                const stringReturn =flagFunctions[flag]() 
                if(emptyStringReturn){
                    return null
                }
                return stringReturn  
            }
        }
        const stringReturn =defaultFunction() 

        if(emptyStringReturn){
            return null
        }
        return stringReturn
        
    }


}