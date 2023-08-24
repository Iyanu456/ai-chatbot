import React from 'react'

function Chat(props) {
    return (
        <div 
            className={props.user}
            style={{
                display: "flex",
                gap: "1em",
                borderRadius: "10px",
                fontSize: "0.9em",
                padding: "1em 1.2em",
                width: "100%",
                height: "fit-content",
                marginTop: "0.6em",
                marginBottom: "0.6em",
                boxShadow: "5px 5px 10px rgba(64, 64, 64, 0.2)"
        }}>
            <div className={props.profileImg}></div>
            <p style={{width: "95%"}}>{props.content}</p>
        </div>
    )
}

export default Chat