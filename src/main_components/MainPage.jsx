import React from "react";
import { useState } from "react";
import './styles/main.css'
import sendIcon from "./assets/icons/send-2.svg"

function App() {
    var obj;
    var [count, setCount] = useState(0)
    var [items, setItems] = useState([])
    var [value, setValue] = useState("")
    var [banner, setBanner] = useState(true)

    function handleClick(event) {
        setCount(count + 1)
        setValue(event.target.value)
        obj = {
            id: count,
            user: 'user',
            message: value
        }
        setItems(oldItems => [...oldItems, obj])
        setBanner(false)
        setValue('')
        event.preventDefault()
    }
    
    return (
        <div className="main-container">
            <aside><button>New chat</button></aside>
            <main>
                <section className="chat-section">
                    {banner && <div className="banner">
                        <h1 style={{textAlign: "center"}}><b>LetsChat</b></h1>
                        <p className="ml-15">Examples</p>
                        <div className="example-group">
                            <div>write an email from bullet lists</div>
                            <div>code a snake game</div>
                            <div>Assist in a task</div>
                        </div>
                    </div>}
                    {items.map((item) => { return(
                    <div className={item.user}>
                        <div className="user-icon">T</div>
                        <p>{item.message}</p>
                    </div>)
                    })}
                </section>
                <form className="prompt-field">
                    <input placeholder="Ask me anything"
                        value={value} 
                        onChange={(e) => {
                        setValue(e.target.value)}}>
                    </input>
                    <button onClick={handleClick}>
                        <img src={sendIcon} alt="material-icon"></img>
                    </button>
                </form>
            </main>
        </div>
    )
}

export default App
