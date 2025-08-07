export default class Branch{
    constructor(name, currentHash){
        this.name = name
        this.currentHash = currentHash
    }
    getName(){
        return this.name
    }
    setPosition(currentHash){
        this.currentHash = currentHash
    }

}