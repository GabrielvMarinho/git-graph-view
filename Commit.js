export default class Commit{
    constructor(){
        this.next = []
    }
    appendCommit(next){
        this.next.push(next)
    }
    
}