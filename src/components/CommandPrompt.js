import { useState } from "react";
import "./CommandPrompt.css"

export default function CommandPrompt({commandDispatcher}){
    const [listCommands, setListCommands] = useState([])
    const [listOutput, setListOutput] = useState([])
    const [temporaryListCommands, setTemporaryListCommands] = useState([])
    const [index, setIndex] = useState(0)
    const [currentCommand, setCurrentCommand] = useState()

    const handleCommandSubmit = function(e){
        e.preventDefault()
        let command = e.target.CommandPromptInput.value
        try{
            let output = commandDispatcher.receiveAndDispatchCommand(command)
            setListOutput((prev) =>[...prev, {message:output, error:false}])

        }catch(e ){
            console.log(e)
            setListOutput((prev) =>[...prev, {message:e.message, error:true}])
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
    console.log(listOutput.length)
    return (
        <div className="commandPrompt">
            
           
            <form className="dispatchCommand" onSubmit={(e) => {handleCommandSubmit(e)}}>
                <label className="cmdArrow">marinho@git-graph:~$&nbsp;</label>
                <input onKeyDown={handleKeyDown} id="CommandPromptInput" 
                autoComplete="off" value={index==listCommands.length?currentCommand:temporaryListCommands[index]} 
                className="cmdInput" 
                onChange={index==listCommands.length?(e) =>updateCurrentCommand(e):(e)=>{console.log("______");updateTemporaryListCommands(e)}}></input>
            </form>
            <div style={{display:"flex", flexDirection:"column"}}>
            {listOutput.length>0 &&listOutput.map((output, index) =>(
                <div className="dispatchCommandHistory">
                    <div style={{display:"flex"}}>
                    <label className="cmdArrow">marinho@git-graph:~$&nbsp;</label>
                    <label className="cmdInput">{listCommands[index]}</label>
                    </div>
                    <h3 className={`output ${output.error?"error":""}`}>{output.message}</h3>
                </div>
            ))}
            </div>
        </div>
    )
}