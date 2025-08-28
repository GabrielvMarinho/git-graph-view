
export default class UiManager{
    constructor(setNodes){
        this.setNodes = setNodes
    }
    createCommit(commitHash){
        console.log(commitHash)
        this.setNodes((nodes) => [...nodes, {id:commitHash, position:{ x: 100, y: 100 }, type:"mainNode"}])
        return
    }
}