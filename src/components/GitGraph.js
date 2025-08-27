import { ReactFlow, Controls, Background, useNodesState, useEdgesState, ReactFlowProvider, addEdge, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useEffect, useState } from 'react';
import MainNode from "./MainNode.js"
import CommandPrompt from './CommandPrompt.js';
export default function GitGraph(){
    
    const [nodes, setNodes, onChangeNodes] = useNodesState([]);
    const [edges, setEdges, onChangeEdges] = useEdgesState([]);
    const onConnect = (params) => {console.log(params);setEdges((eds) => addEdge(params, eds))};
    
    useEffect(() =>{
        // console.log("new render")
        setNodes((nodes) => [...nodes, {id:"1", position:{ x: 100, y: 100 }, type:"mainNode"}])
    }, [commandHappened])

    const nodeTypes = {
    	mainNode:MainNode
    }
    return (
        <div style={{
        width: "100vw",
        height: "100vh"
        }}>
            <CommandPrompt></CommandPrompt>
        
            <ReactFlow
            colorMode='dark'
            nodes={nodes}
	        nodeTypes={nodeTypes}
            edges={edges}
            onNodesChange={onChangeNodes}
            onEdgesChange={onChangeEdges}
            onConnect={onConnect}
            >
            <Background />
            <Controls />
            </ReactFlow>
        </div>
    );
}
