import { useEffect, useState } from "react";
import "./CommandPrompt.css"

export default function CommandPrompt(){
    const [listCommand, setListCommands] = useState([])
    const [currentCommand, setCurrentCommand] = useState()
    useEffect(() =>{
        console.log("refresh")
    }, [listCommand])
    const handleCommandSubmit = function(e){
        e.preventDefault()
        setListCommands((historyList) => [...historyList, e.target.CommandPromptInput.value])
        setCurrentCommand("")
    }
    return (
        <div className="commandPrompt">
            <form className="dispatchCommand" onSubmit={(e) => {handleCommandSubmit(e)}}>
                <label className="cmdArrow">&gt;</label>
                <input id="CommandPromptInput" value={currentCommand} className="cmdArrowInput" onChange={(e) =>setCurrentCommand(e.target.value)}></input>
            </form>
        </div>
    )
}