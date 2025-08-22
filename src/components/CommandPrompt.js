import "./CommandPrompt.css"

export default function CommandPrompt(){
    return (
        <div className="commandPrompt">
            <form className="dispatchCommand">
                <label className="cmdArrow">&gt;</label>
                <input className="cmdArrowInput"></input>
            </form>
        </div>
    )
}