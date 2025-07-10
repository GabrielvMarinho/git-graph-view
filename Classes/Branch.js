export default class Branch{
    constructor(name, currenHash){
        this.name = name
        this.currenHash = currenHash
    }
    getName(){
        return this.name
    }
    setPosition(currenHash){
        this.currenHash = currenHash
    }

}