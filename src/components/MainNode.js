import { Handle, Position } from "@xyflow/react";
import "./MainNode.css";
export default function MainNode({data}){
    let headInBranches = false
    if(data.branches){
        headInBranches = data.branches.includes(data.headPosition)
    }
    
    return(
        <div className={`mainNode ${!headInBranches && data.headPosition==data.id?"detachedHeadNode":""}`}>
            <Handle isConnectable={false} className={"mainNodeHandler"} type="target" position={"left"}/>
            <Handle isConnectable={false} className={"mainNodeHandler"} type="source" position={"right"}/>
            <label className="nodeId">{data.id.slice(0,7)}</label>
            <label className="nodeMessage">{data.message?`"${data.message}"`:""}</label>
            
            <div className="branchesMainNode">
                {data.branches && data.branches.map(branch =>{
                    return <p className={`branchName ${headInBranches && branch==data.headPosition?"activateBranchName":""}`}>{branch}</p>
                })}
            </div>
        </div>
    )
}
