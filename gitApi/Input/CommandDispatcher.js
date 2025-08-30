import CheckoutHandler from "../Input/CommandHandlers/CheckoutHandler.js"
import Command from "../Input/Command.js"
import CommitHandler from "../Input/CommandHandlers/CommitHandler.js"
import MergeHandler from "../Input/CommandHandlers/MergeHandler.js"
import ResetHandler from "../Input/CommandHandlers/ResetHandler.js"
import BranchHandler from "../Input/CommandHandlers/BranchHandler.js"
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
        return this[command.subcommand](command, command.hasFlag("-q", "--quiet"))
    }
   
    branch(command, hideMessage=false){
        const flagFunctions = {
            "-d": () => this.branchHandler.branchCheckDelete(command, hideMessage),
            "--delete": () => this.branchHandler.branchCheckDelete(command, hideMessage),
            "-D": () => this.branchHandler.branchDelete(command, hideMessage),
            "-m": () => this.branchHandler.renameBranch(command),
            "--move": () => this.branchHandler.renameBranch(command),
            "-M": () => this.branchHandler.renameBranchDelete(command),

        }
        const defaultFunction = () => this.branchHandler.branch(command)
        return this.executeAllFlags(command, flagFunctions, defaultFunction)
    }
    checkout(command, hideMessage=false){
        const flagFunctions = {
            "-b": () => this.checkoutHandler.checkoutCreateBranch(command, hideMessage),
            "-B": () => this.checkoutHandler.checkoutResetCreateBranch(command, hideMessage),
        }
        const defaultFunction = () => this.checkoutHandler.checkout(command, hideMessage)
        return this.executeAllFlags(command, flagFunctions, defaultFunction);
    }
    merge(command, hideMessage=false){
        const flagFunctions = {
            "--squash": () => this.mergeHandler.mergeSquash(command, hideMessage),
        }
        
        const defaultFunction = () => this.mergeHandler.merge(command, hideMessage)

        return this.executeAllFlags(command, flagFunctions, defaultFunction);
    }
    commit(command, hideMessage=false){
        return this.commitHandler.commit(command, hideMessage)
    }

    reset(command){
        return this.resetHandler.reset(command)
    }

    executeAllFlags(command, flagFunctions, defaultFunction){
        for (const flag of command._arguments) {
            if (flagFunctions[flag]) {
                return flagFunctions[flag]()  
            }
        } 
        return defaultFunction()
    }


}