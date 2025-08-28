import { useEffect, useState } from "react";
import "./CommandPrompt.css"

export default function CommandPrompt({commandDispatcher}){
    const [listCommand, setListCommands] = useState([])
    const [currentCommand, setCurrentCommand] = useState()

    const handleCommandSubmit = function(e){
        e.preventDefault()
        let command = e.target.CommandPromptInput.value
        commandDispatcher.receiveAndDispatchCommand(command)
        setListCommands((historyList) => [...historyList, command])
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