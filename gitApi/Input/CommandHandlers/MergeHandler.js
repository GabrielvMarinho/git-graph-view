export default class MergeHandler{
    constructor(gitObject){
        this.gitObject = gitObject
    }
    merge(command, hideMessage=false){
        const hashOrBranchToMove = command.extractValueAfterOneWordIgnoringDash("merge")
        let returnString
        if(this.gitObject.isCurrentCommitAnAncestorOf(hashOrBranchToMove)){
            returnString = this.mergeFastForward(hashOrBranchToMove)
        }else{
            const message = command.extractValueAfterFlag("-m")
            returnString = this.normalMerge(hashOrBranchToMove, message)
        }
        if(hideMessage){
            return
        }else{
            return returnString
        }
    }
    normalMerge(hashOrBranchToMove, message){
        var hashToMerge = this.gitObject.getHashFrom(hashOrBranchToMove)
        if(this.gitObject.isHeadDetached()){
            if(this.gitObject.isBranch(hashOrBranchToMove)){
                const returnMessage = `Merge commit '${hashToMerge.slice(0, 7)}' into HEAD`
                this.gitObject.createMergeCommit(message?message:returnMessage, hashToMerge)
                return message?message:returnMessage
            }
            else{
                const returnMessage = `Merge commit '${hashToMerge.slice(0, 7)}' into HEAD` 
                this.gitObject.createMergeCommit(message?message:returnMessage, hashToMerge)
                return message?message:returnMessage
            }
        }else{
            var currentBranch = this.gitObject.getCurrentBranch()

            if(this.gitObject.isBranch(hashOrBranchToMove)){
                const returnMessage = `Merge branch '${hashOrBranchToMove}' into ${currentBranch.name}`
                this.gitObject.createMergeCommit(message?message:returnMessage, hashToMerge)
                return message?message:returnMessage
            }
            else{
                const returnMessage = `Merge commit '${hashToMerge.slice(0, 7)}' into ${currentBranch.name}` 
                this.gitObject.createMergeCommit(message?message:returnMessage, hashToMerge)
                return message?message:returnMessage
            }
        }
    }
    mergeFastForward(hashOrBranchToMove){
        var currentHash = this.gitObject.getCurrentHash()
        var hashToMerged = this.gitObject.getHashFrom(hashOrBranchToMove)
        this.gitObject.updateCurrentHashOrBranchPointerToHash(hashToMerged)
        return `Updating ${currentHash.slice(0, 7)}..${hashToMerged.slice(0, 7)}\nFast-forward`
    }
    mergeSquash(command, hideMessage=false){
        this.gitObject.createCommit("Squash merge")
        let returnString
        if(this.gitObject.isHeadDetached){
            var message = this.gitObject.getCurrentBranchAndHashString()
            returnString = `[${message}] Squash merge commit`
        }
        else{
            var message = this.gitObject.getCurrentBranchAndHashString()
            returnString = `[${message}] Squash merge commit`
        }
        if(hideMessage){
            return 
        }else{
            return returnString
        }
        
        
    }
}