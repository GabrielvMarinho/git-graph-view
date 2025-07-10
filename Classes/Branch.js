export default class Branch{
    constructor(name, currenHash){
        this.name = name
        this.currenHash = currenHash
    }
    
    setPosition(currenHash){
        this.currenHash = currenHash
    }

}