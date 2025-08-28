
export default class UiManager{
    constructor(setNodes){
        this.setNodes = setNodes
    }
    createCommit(commitHash){
        console.log(commitHash)
        this.setNodes((nodes) => [...nodes, {id:"1", position:{ x: 100, y: 100 }, type:"mainNode"}])
        return
    }
}