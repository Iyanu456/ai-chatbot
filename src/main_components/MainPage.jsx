import React from "react";
import { useState } from "react";
import './styles/main.css'
import PromptField from "./PromptField"


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
                        <p className="ml-30">Examples</p>
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
            </main>
                <PromptField 
                    className="prompt-field"
                    placeholder="Ask me anything"
                    value={value} 
                    onChange={e => setValue(e.target.value)}
                    onClick={handleClick}
                />
           
        </div>
    )
}

export default App