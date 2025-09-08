import { ReactFlow, Controls, Background, useNodesState, useEdgesState, ReactFlowProvider, addEdge, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import MainNode from "./MainNode.js"
import CommandPrompt from './CommandPrompt.js';
import UiManager from '@/gitApi/GitObjectStructure/UiManager.js';
import GitObject from '../../gitApi/GitObjectStructure/GitObject.js';
import CommandDispatcher from '@/gitApi/Input/CommandDispatcher.js';
import { useEffect } from 'react';

const xPosition = window.screen.width>900?500:(window.screen.width-(window.screen.width*0.5))/2
const yPosition = (window.screen.height-(window.screen.height*0.5))/2
const uiManager = new UiManager(xPosition, yPosition);
const gitObject = new GitObject(uiManager);
const commandDispatcher = new CommandDispatcher(gitObject)
const initialNode = {
   "data":{id:gitObject.getCurrentHash()},
   "id":gitObject.getCurrentHash(),
   "position":{x:xPosition, y:yPosition},
   "type":"mainNode"
}
export default function GitGraph(){
    
    const [nodes, setNodes, onChangeNodes] = useNodesState([initialNode]);
    const [edges, setEdges, onChangeEdges] = useEdgesState([]);
    
    useEffect(()=>{
        console.log(nodes)
        const selectedNode = nodes.filter(node => {return node.selected==true})[0]
        if(selectedNode && selectedNode.dragging &&
            (selectedNode.id == uiManager.head || selectedNode.data.branches.includes(uiManager.head))){
            uiManager.updateCoordinates(selectedNode.position.x, selectedNode.position.y)
        }
        
        uiManager.setNodesList(nodes)
        uiManager.setSetNodes(setNodes) 
        uiManager.setSetEdges(setEdges)
        
    }, [nodes, edges])

    useEffect(()=>{
        uiManager.updatePointers(gitObject.getCurrentState())
    }, [])

    const nodeTypes = {
    	mainNode:MainNode
    }
    

    return (
        <div style={{
        width: "100vw",
        height: "100vh"
        }}>
            <ReactFlowProvider>
                <CommandPrompt commandDispatcher={commandDispatcher}></CommandPrompt>
                <ReactFlow
                className='reactFlowPanel'
                colorMode='dark'
                nodes={nodes}
                nodeTypes={nodeTypes}
                edges={edges}
                onNodesChange={onChangeNodes}
                onEdgesChange={onChangeEdges}
                deleteKeyCode={null}
                proOptions={{hideAttribution: true}}
                >
                <Background bgColor='#121212ff'/>
                </ReactFlow>
            </ReactFlowProvider>
        </div>
    );
}
