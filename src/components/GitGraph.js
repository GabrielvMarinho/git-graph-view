import { ReactFlow, Controls, Background, useNodesState, useEdgesState, ReactFlowProvider, addEdge, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import MainNode from "./MainNode.js"
import CommandPrompt from './CommandPrompt.js';
import UiManager from '@/gitApi/GitObjectStructure/UiManager.js';
import GitObject from '../../gitApi/GitObjectStructure/GitObject.js';
import CommandDispatcher from '@/gitApi/Input/CommandDispatcher.js';

export default function GitGraph(){
    
    const [nodes, setNodes, onChangeNodes] = useNodesState([]);
    const [edges, setEdges, onChangeEdges] = useEdgesState([]);
    const onConnect = (params) => {console.log(params);setEdges((eds) => addEdge(params, eds))};
    
    const uiManager = new UiManager(setNodes);
    const gitObject = new GitObject(uiManager);
    const commandDispatcher = new CommandDispatcher(gitObject)
    console.log(nodes)
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
                onConnect={onConnect}
                >
                <Background />
                <Controls />
                </ReactFlow>
            </ReactFlowProvider>
        </div>
    );
}
