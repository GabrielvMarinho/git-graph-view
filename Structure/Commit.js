export default class Commit{
    constructor(message, ...parents){
        this.message = message
        this.parents = parents
    }
   
    setMessage(message){
        this.message = message
    }
    
}