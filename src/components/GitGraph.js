import { ReactFlow, Controls, Background, useNodesState, useEdgesState, ReactFlowProvider, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useEffect } from 'react';
export default function GitGraph(){
    const [nodes, setNodes, onChangeNodes] = useNodesState([]);
    const [edges, setEdges, onChangeEdges] = useEdgesState([]);
    const onConnect = (params) => {console.log(params);setEdges((eds) => addEdge(params, eds))};
    
    const handleAddNode = () => {
        setNodes((nds) => [
        ...nds,
        {
            id: `${nds.length + 1}`,
            position: { x: 100 + nds.length, y: 100 + nds.length * 100 },
            data: { label: `Node ${nds.length + 1}` },
            type: 'default',
        },
        ]);
    };

    useEffect(() =>{
        handleAddNode()
        handleAddNode()

        setEdges(addEdge({source:"1", target:"2"}, edges))

    }, [])
    console.log(edges)
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