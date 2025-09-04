
const DISTANCE_NODES = 150
const NODE_RADIUS = 20

export default class UiManager{
    constructor(){    
        this.head = "main"
        this.currentCommitPositionX = 500
        this.currentCommitPositionY = 300    
        this.nodes = []
    }
    updateCoordinates(x, y){
        this.currentCommitPositionX = x
        this.currentCommitPositionY = y
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
    createCommit(commitHash, parentHash=null, message=null){ 
        this.createCommitIncrementCoordinates()
        this.nodes.push( 
            {data:{id:commitHash, message:message},
            id:commitHash, 
            position:{ x: this.currentCommitPositionX, y: this.currentCommitPositionY }, 
            type:"mainNode"})
        this.updateCurrentCoordinatesToCommit(commitHash)

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
        const baseY = this.currentCommitPositionY; 
        while(true){
            if(cont == 0){
                this.currentCommitPositionY = baseY 
            }else{
                const direction = (cont % 2 === 0) ? 1 : -1; 
                const offset = DISTANCE_NODES * Math.ceil(cont / 2) * direction;
                this.currentCommitPositionY = baseY + offset 
            }
            cont = cont + 1
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
    updatePointers(currentState){
        this.head = currentState.head.currentPosition
        let nodes = this.nodes.map(node =>{
            const newNode = {
                ...node,
                data: {
                ...node.data,
                headPosition: currentState.head.currentPosition,
                branches: []
                }
            };
            for (let branch of currentState.branches) {
                
                if (branch.currentHash == node.id) {
                    newNode.data.branches.push(branch.name);
                }
            }
            return newNode
        })
        this.setNodes(nodes)

    }
   
    updateCurrentCoordinatesToCommit(hash){
        for(let node of this.nodes){
            if(node.id.startsWith(hash)){
                this.currentCommitPositionX = node.position.x
                this.currentCommitPositionY = node.position.y
                break;
            }
            
        }
    }
}