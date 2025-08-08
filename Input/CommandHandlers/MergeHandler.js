export default class MergeHandler{
    constructor(gitObject){
        this.gitObject = gitObject
    }
    merge(command){
        hashOrBranchToMove = command.extractValueAfterWord("merge")
        
        if(this.gitObject.isCurrentCommitAnAncestorOf(hashOrBranchToMove)){
            return this.mergeFastForward(hashOrBranchToMove)
        }else{
            const message = command.extractValueFromFlag("-m")
            
            return this.normalMerge(hashOrBranchToMove, message)
        }
    }
    normalMerge(hashOrBranchToMove, message){
        var hashToMerge = this.gitObject.getHashFrom(hashOrBranchToMove)
        if(this.gitObject.isHeadDetached()){
            if(this.gitObject.isBranch(hashOrBranchToMove)){
                const returnMessage = `Merge commit '${hashToMerge.slice(0, 7)}' into HEAD`
                this.gitObject.createMergeCommit(message?message:returnMessage, hashToMerge)
                return returnMessage
            }
            else{
                const returnMessage = `Merge commit '${hashToMerge.slice(0, 7)}' into HEAD` 
                this.gitObject.createMergeCommit(message?message:returnMessage, hashToMerge)
                return returnMessage
            }
        }else{
            var currentBranch = this.gitObject.getCurrentBranch()

            if(this.gitObject.isBranch(hashOrBranchToMove)){
                const returnMessage = `Merge branch '${hashOrBranchToMove}' into ${currentBranch.name}`
                this.gitObject.createMergeCommit(message?message:returnMessage, hashToMerge)
                return returnMessage
            }
            else{
                const returnMessage = `Merge commit '${hashToMerge.slice(0, 7)}' into ${currentBranch.name}` 
                this.gitObject.createMergeCommit(message?message:returnMessage, hashToMerge)
                return returnMessage
            }
        }
    }
    mergeFastForward(hashOrBranchToMove){
        var currentHash = this.gitObject.getCurrentHash()
        var hashToMerged = this.gitObject.getHashFrom(hashOrBranchToMove)
        this.gitObject.updateCurrentHashOrBranchPointerToHash(hashToMerged)
        return `Updating ${currentHash.slice(0, 7)}..${hashToMerged.slice(0, 7)}\nFast-forward`
    }
    mergeSquash(command){
        this.gitObject.createCommit("Squash merge")
        if(this.gitObject.isHeadDetached){
            var message = this.gitObject.getCurrentBranchAndHashString()
            return `[${message}] Squash merge commit`
        }
        else{
            var message = this.gitObject.getCurrentBranchAndHashString()
            return `[${message}] Squash merge commit`
        }
        
        
    }
}