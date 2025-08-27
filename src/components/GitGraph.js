import { ReactFlow, Controls, Background, useNodesState, useEdgesState, ReactFlowProvider, addEdge, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useEffect } from 'react';
import MainNode from "./MainNode.js"
export default function GitGraph({graph}){
    
    const [nodes, setNodes, onChangeNodes] = useNodesState([]);
    const [edges, setEdges, onChangeEdges] = useEdgesState([]);
    const onConnect = (params) => {console.log(params);setEdges((eds) => addEdge(params, eds))};

    useEffect(() =>{
        setNodes((nodes) => [...nodes, {id:"1", position:{ x: 100, y: 100 }, type:"mainNode"}])

        setEdges(addEdge({source:"1", target:"2"}, edges))

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
            <button
            style={{
                position: 'absolute',
                zIndex: 10,
                left: 10,
                top: 10,
                padding: '8px 16px',
                backgroundColor: '#1a192b',
                color: '#fff',
            }}
            onClick={handleAddNode}
            >
            Create Node
            </button>
            <ReactFlow
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
        </ReactFlowProvider>
        </div>
    );
}
