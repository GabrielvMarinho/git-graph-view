import { useEffect, useState } from "react";
import "./CommandPrompt.css"

export default function CommandPrompt({commandDispatcher}){
    const [listCommands, setListCommands] = useState([])
    const [temporaryListCommands, setTemporaryListCommands] = useState([])
    const [index, setIndex] = useState(0)
    const [currentCommand, setCurrentCommand] = useState()

    const handleCommandSubmit = function(e){
        e.preventDefault()
        let command = e.target.CommandPromptInput.value
        commandDispatcher.receiveAndDispatchCommand(command)
        setIndex(listCommands.length+1)
        setTemporaryListCommands([...listCommands, command])
        setListCommands((historyList) => [...historyList, command])
        setCurrentCommand("")
    }
    const handleKeyDown = function(e){
        if(e.key == "ArrowDown"){
            console.log("length", listCommands.length)
            console.log(index)
            if(index<listCommands.length){
                setIndex((prev) => {return prev+1})
            }
        }
        if(e.key == "ArrowUp"){
            if(index>0){
                setIndex((prev) => {return prev-1})
            }
        }
    }
    const updateTemporaryListCommands = function(e){
        e.preventDefault()
        console.log(e.target)
        let command = e.target.value
        const newArray = [...temporaryListCommands]
        newArray[index] = command
        console.log(newArray)
        setTemporaryListCommands(newArray)
    }
    const updateCurrentCommand = function(e){
        let command = e.target.value
        setCurrentCommand(command)
    }
    return (
        <div className="commandPrompt">
            <form className="dispatchCommand" onSubmit={(e) => {handleCommandSubmit(e)}}>
                <label className="cmdArrow">&gt;</label>
                <input onKeyDown={handleKeyDown} id="CommandPromptInput" 
                autoComplete="off" value={index==listCommands.length?currentCommand:temporaryListCommands[index]} 
                className="cmdArrowInput" 
                onChange={index==listCommands.length?(e) =>updateCurrentCommand(e):(e)=>{console.log("______");updateTemporaryListCommands(e)}}></input>
            </form>
        </div>
    )
}