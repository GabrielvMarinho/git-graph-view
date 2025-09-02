
const DISTANCE_NODES = 100
const NODE_RADIUS = 25

export default class UiManager{
    constructor(){    
        this.currentCommitPositionX = 0
        this.currentCommitPositionY = 0    
    }
    setNodesList(nodes){
        this.nodes = nodes
    }
    setSetNodes(setNodes){
        this.setNodes = setNodes
    }
    setSetEdges(setEdges){
        this.setEdges = setEdges
    }
    createCommit(commitHash, parentHash){ 
        this.createCommitIncrementCoordinates()
        this.setNodes((nodes) => [...nodes, 
            {data:{id:commitHash.slice(0,7)},
            id:commitHash, 
            position:{ x: this.currentCommitPositionX, y: this.currentCommitPositionY }, 
            type:"mainNode"}])
            
        this.updateHeadToCommit(commitHash)

        this.setEdges((edges) => [...edges, 
            {id:`${parentHash} - ${commitHash}`, 
            source:parentHash, 
            target:commitHash, 
            type:"default"}])

        return
    }
    areNodesIntersecting = function(x1, y1, x2, y2){
        if((x1+NODE_RADIUS*2>x2 && x1-NODE_RADIUS*2<x2)
            &&
            (y1+NODE_RADIUS*2>y2 && y1-NODE_RADIUS*2<y2)
         ){
            return true
        }
        return false
    }
    createCommitIncrementCoordinates(){
        this.currentCommitPositionX += DISTANCE_NODES
        let cont = 0
        while(true){
            this.currentCommitPositionY = DISTANCE_NODES * Math.ceil(cont/2) * ((-1)**(cont+1)) + this.currentCommitPositionY      
            cont++
            let intersection = false
            for(let node of this.nodes){
                if(this.areNodesIntersecting(node.position.x, node.position.y, this.currentCommitPositionX, this.currentCommitPositionY)){
                    intersection = true 
                }
            }
            if(!intersection){
                break
            }
        }

    }
    updateHeadToCommit(hash){
        this.setNodes(
            prev =>prev.map(node =>({
                ...node,
                data:{...node.data, isHead: node.id==hash}
            }))
        )
    }
    updateCurrentCoordinatesAndHeadToCommit(hash){
        for(let node of this.nodes){
            if(node.id == hash){
                this.currentCommitPositionX = node.position.x
                this.currentCommitPositionY = node.position.y
                this.updateHeadToCommit(hash)
                break;
            }
            
        }
    }
}