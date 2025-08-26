import { Handle, Position } from "@xyflow/react";
import "./MainNode.css";
export default function MainNode(){
    return(
        <div className={"mainNode"}>
            <Handle className={"mainNodeHandler"} type="target" position={"right"}/>
            <Handle className={"mainNodeHandler"} type="source" position={"left"}/>
        </div>
    )
}
