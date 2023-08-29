import React from "react";
import { useState } from "react";
import './styles/main.css'
import PromptField from "./PromptField"
import Header from "./Header";



function App() {
    var obj;
    var [count, setCount] = useState(0)
    var [items, setItems] = useState([])
    var [value, setValue] = useState("")
    var [banner, setBanner] = useState(true)

    function update(prompt) {
        obj = {
            id: count,
            user: 'user',
            message: prompt
        }
        setItems(oldItems => [...oldItems, obj])
        setBanner(false)

    }

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
            <div style={{overflowY: "scroll"}}>
            <Header />
            <main>
                <section className="chat-section">
                    {banner && 
                    <div className="banner">
                        <h1 style={{textAlign: "center"}}><b>LetsChat</b></h1>
                        <p className="ml-30">Examples</p>
                        <div className="example-group">
                            <div onClick={() => update("write an email from bullet lists")}>write an email from bullet lists</div>
                            <div onClick={() => update("code a snake game")}>code a snake game</div>
                            <div onClick={() => update("Assist in a task")}>Assist in a task</div>
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
            </div>
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