
const DISTANCE_NODES = 50
const NODE_RADIUS = 25

export default class UiManager{
    constructor(){
        
        this.currentCommitPositionX =0
        this.currentCommitPositionY =0    
    }
    setCurrentNodeHash(hash){
        this.currentNodeHash = hash
    }
    setNodes(nodes){
        this.nodes = nodes
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
    createCommitIncrementCoordinates(){
        const isNodeIntersecting = function(x1, y1, x2, y2){
        }

        //calculate if nodes are intersecting, if they are, increment c by one, until a free
        //position is found by the formula, depending on the type of action in the graph 
        //this will be different, this algorithm only applies to creating simple commits
        while(true){
            this.currentCommitPositionY = DISTANCE_NODES * Math.ceil(c/2) * ((-1)**(c+1))         
            for(let node of this.nodes){
                if(node.position.y == currentCommitPositionY){
                    if(isNodeIntersecting()){

                    }
                }
            }
        }

    }
}