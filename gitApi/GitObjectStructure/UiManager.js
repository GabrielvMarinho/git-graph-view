
const DISTANCE_NODES = 50
export default class UiManager{
    constructor(){
        this.nodesCreatedFromCurrentCommit = 0
        this.currentCommitPositionX =0
        this.currentCommitPositionY =0    
    }
    setSetNodes(setNodes){
        this.setNodes = setNodes
    }
    setSetEdges(setEdges){
        this.setEdges = setEdges
    }
    createCommit(commitHash, parentHash){ 
        this.incrementCounterAndPosition()
       
        this.setNodes((nodes) => [...nodes, 
            {id:commitHash, 
            position:{ x: this.currentCommitPositionX, y: this.currentCommitPositionY }, 
            type:"mainNode"}])

        this.setEdges((edges) => [...edges, 
            {id:`${parentHash} - ${commitHash}`, 
            source:parentHash, 
            target:commitHash, 
            type:"default"}])
        return
    }
    incrementCounterAndPosition(){
        this.nodesCreatedFromCurrentCommit++                
        let c = this.nodesCreatedFromCurrentCommit
        console.log((-1)**(c+1))
        this.currentCommitPositionY = DISTANCE_NODES * Math.ceil(c/2) * ((-1)**(c+1))        
        console.log(this.currentCommitPositionY)
    }
}