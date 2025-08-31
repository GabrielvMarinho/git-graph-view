
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
    setCurrentNodeHash(hash){
        this.currentNodeHash = hash
    }
    setSetNodes(setNodes){
        this.setNodes = setNodes
    }
    setSetEdges(setEdges){
        this.setEdges = setEdges
    }
    createCommit(commitHash, parentHash){ 
        console.log("tentando")
        this.createCommitIncrementCoordinates()
        console.log(this.currentCommitPositionX)
        console.log(this.currentCommitPositionY)
        console.log(commitHash)

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
        console.log("the y is", this.currentCommitPositionY)
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
    updateCurrentPositionToCommit(hash){
        for(let node of this.nodes){
            if(node.id == hash){
                this.currentCommitPositionX = node.position.x
                this.currentCommitPositionY = node.position.y
                console.log("the current position is ", this.currentCommitPositionX, " - ", this.currentCommitPositionY)

                break;
            }
        }
    }
}