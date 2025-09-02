import { ReactFlow, Controls, Background, useNodesState, useEdgesState, ReactFlowProvider, addEdge, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import MainNode from "./MainNode.js"
import CommandPrompt from './CommandPrompt.js';
import UiManager from '@/gitApi/GitObjectStructure/UiManager.js';
import GitObject from '../../gitApi/GitObjectStructure/GitObject.js';
import CommandDispatcher from '@/gitApi/Input/CommandDispatcher.js';
import { useEffect } from 'react';

const uiManager = new UiManager();
const gitObject = new GitObject(uiManager);
const commandDispatcher = new CommandDispatcher(gitObject)
const initialNode = {
   "data":{id:gitObject.getCurrentHash()},
   "id":gitObject.getCurrentHash(),
   "position":{x:0, y:0},
   "type":"mainNode"
}
export default function GitGraph(){
    
    const [nodes, setNodes, onChangeNodes] = useNodesState([initialNode]);
    const [edges, setEdges, onChangeEdges] = useEdgesState([]);
    
    useEffect(()=>{
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
                colorMode='dark'
                nodes={nodes}
                nodeTypes={nodeTypes}
                edges={edges}
                onNodesChange={onChangeNodes}
                onEdgesChange={onChangeEdges}
                >
                <Background />
                <Controls />
                </ReactFlow>
            </ReactFlowProvider>
        </div>
    );
}
