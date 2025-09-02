import { useEffect, useState } from "react";
import "./CommandPrompt.css"

export default function CommandPrompt({commandDispatcher}){
    const [listCommands, setListCommands] = useState([])
    const [temporaryListCommands, setTemporaryListCommands] = useState([])
    const [index, setIndex] = useState(0)
    const [currentCommand, setCurrentCommand] = useState()
    const [lastOutput, setLastOutput] = useState()
    const handleCommandSubmit = function(e){
        e.preventDefault()
        let command = e.target.CommandPromptInput.value
        try{
            let output = commandDispatcher.receiveAndDispatchCommand(command)
            setLastOutput({message:output, error:false})
        }catch(e ){
            console.log(e)
            setLastOutput({message:e.message, error:true})
        }
        setIndex(listCommands.length+1)
        setTemporaryListCommands([...listCommands, command])
        setListCommands((historyList) => [...historyList, command])
        setCurrentCommand("")
    }
    const handleKeyDown = function(e){
        if(e.key == "ArrowDown"){
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
        let command = e.target.value
        const newArray = [...temporaryListCommands]
        newArray[index] = command
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
            <h3 className={`lastOutput ${lastOutput && lastOutput.error?"error":""}`}>{lastOutput && lastOutput.message}</h3>
        </div>
    )
}