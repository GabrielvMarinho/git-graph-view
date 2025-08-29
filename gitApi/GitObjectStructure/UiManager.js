
export default class UiManager{
    setSetNodes(setNodes){
        this.setNodes = setNodes
    }
    setSetEdges(setEdges){
        this.setEdges = setEdges
    }
    createCommit(commitHash, parentHash){
        this.setNodes((nodes) => [...nodes, {id:commitHash, position:{ x: 100, y: 100 }, type:"mainNode"}])
        this.setEdges((edges) => [...edges, {id:`${parentHash} - ${commitHash}`, source:parentHash, target:commitHash, position:{ x: 100, y: 100 }, type:"default"}])
        return
    }
}