import sendIcon from "./assets/icons/send-2.svg"

function PromptField(props) {
    return (
        <form className={props.className}>
        <input placeholder={props.placeholder}
            value={props.value} 
            onChange={props.onChange}>
        </input>
        <button onClick={props.onClick}>
            <img src={sendIcon} alt="material-icon"></img>
        </button>
    </form>
    )
}

export default PromptField
