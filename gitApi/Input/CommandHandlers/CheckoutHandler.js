import InvalidReferenceForBranchCreationException from "../../Errors/InvalidReferenceForBranchCreationException"
import NotValidBranchNameException from "../../Errors/NotValidBranchNameException"
import { isValidBranchName } from "../../utils"

export default class CheckoutHandler{

    constructor(gitObject){
        this.gitObject = gitObject
    }
    
    checkout(command, hideMessage=false){     
        branchOrHash = command.extractValueAfterOneWordIgnoringDash("checkout")
        let returnString
        this.gitObject.updateCurrentHashOrBranchPointer(branchOrHash)
        if(this.gitObject.isBranch(branchOrHash)){
            returnString= `Switched to branch '${branchOrHash}'`
        }else{
            returnString= `Note: switching to ${branchOrHash}.\nYou are in 'detached HEAD' state`
        }
        
        if(hideMessage){
            return
        }
        else{
            return returnString
        }

    }
    checkoutCreateBranch(command){
        const steps = (branch, positionToGo) =>{
            this.gitObject.updateCurrentHashOrBranchPointer(positionToGo)
            this.gitObject.createBranch(branch)
            this.gitObject.updateCurrentHashOrBranchPointer(branch)
        }
        branch = command.extractValueAfterFlag("-b")

        positionToGo = command.extractValueAfterOneWordIgnoringDash(branch)
        let returnString
        if(positionToGo){
            if(!isValidBranchName(positionToGo)){
                throw new NotValidBranchNameException(positionToGo)
            }
            steps(branch, positionToGo)
            returnString = `Switched to a new branch '${branch}'`
        }else{
            steps(branch, this.gitObject.getCurrentHash())
        }
        
        if(hideMessage){
            return
        }else{
            if(!returnString){
                returnString = `Switched to a new branch '${branch}'` 

            }
            return returnString
        }
    }
    checkoutResetCreateBranch(command){
        const steps = (branch, positionToGo) =>{
            try{
                this.gitObject.updateCurrentHashOrBranchPointer(positionToGo)
            }catch{
                throw new InvalidReferenceForBranchCreationException(branch, positionToGo)
            }
            this.gitObject.deleteBranch(branch, force=true)
            this.gitObject.createBranch(branch)
            this.gitObject.updateCurrentHashOrBranchPointer(branch)
        }
        branch = command.extractValueAfterFlag("-B")

        positionToGo = command.extractValueAfterTwoWordsIgnoringDash("-B")
        
        if(positionToGo){
            steps(branch, positionToGo)
            return `Reset branch '${branch}'`
        }
        if(this.gitObject.branchAlreadyExist(branch) && this.gitObject.getCurrentBranch().name==branch){
            // nothing happens, this is correct
            return `Reset branch '${branch}'`
        }
        if(this.gitObject.branchAlreadyExist(branch)){
            steps(branch, this.gitObject.getCurrentHash())
            return `Switched to and reset branch '${branch}'`
        }

        steps(branch, this.gitObject.getCurrentHash())
        return `Switched to a new branch '${branch}'`  
    }
}