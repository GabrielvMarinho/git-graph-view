import { Handle, Position } from "@xyflow/react";
import "./MainNode.css";
export default function MainNode(){
    return(
        <div className={"mainNode"}>
            <Handle isConnectable={false} className={"mainNodeHandler"} type="target" position={"left"}/>
            <Handle isConnectable={false} className={"mainNodeHandler"} type="source" position={"right"}/>
        </div>
    )
}
