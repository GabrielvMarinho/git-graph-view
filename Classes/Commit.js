export default class Commit{
    constructor(name){
        this.name = name
        this.next = []
    }
    appendCommit(next){
        this.next.push(next)
    }
    
}