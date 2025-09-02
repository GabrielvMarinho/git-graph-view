import { Handle, Position } from "@xyflow/react";
import "./MainNode.css";
export default function MainNode({data}){
    
    return(
        <div className={`mainNode ${data.isHead?"head":""}`}>
            <Handle isConnectable={false} className={"mainNodeHandler"} type="target" position={"left"}/>
            <Handle isConnectable={false} className={"mainNodeHandler"} type="source" position={"right"}/>
            <label className="nodeId">{data.id}</label>
        </div>
    )
}
