
function Message(props) {
    return (
        <div className={props.className}>
            <div className={props.userIconClass}>{props.userIcon}</div>
            <p>{props.message}</p>
        </div>
    )
}

export default Message