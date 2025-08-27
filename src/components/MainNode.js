import { Handle, Position } from "@xyflow/react";
import "./MainNode.css";
export default function MainNode(listOfTargets, listOfSources){
    return(
        <div className={"mainNode"}>
            <Handle isConnectable={false} className={"mainNodeHandler"} type="target" position={"right"}/>
            <Handle isConnectable={false} className={"mainNodeHandler"} type="source" position={"left"}/>
        </div>
    )
}
