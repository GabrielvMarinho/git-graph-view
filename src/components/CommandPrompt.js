import "./CommandPrompt.css"

export default function CommandPrompt({commandHappened, setCommandHappened}){
    return (
        <div className="commandPrompt">
            <form className="dispatchCommand" onSubmit={() => commandHappened(!commandHappened)}>
                <label className="cmdArrow">&gt;</label>
                <input className="cmdArrowInput"></input>
            </form>
        </div>
    )
}