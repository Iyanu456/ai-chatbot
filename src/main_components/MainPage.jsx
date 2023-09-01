import React from "react";
import { useState } from "react";
import './styles/main.css'
import PromptField from "./PromptField"
import Header from "./Header";
import runReplicate from "./run_replicate";
import lamLogo from "./assets/icons/lamlogo.png"



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
        if (value === "") { return }
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

        runReplicate(prompt)
        .then(outputText => {
            setCount(count + 1)
            setValue(event.target.value)
            obj = {
                id: count,
                user: 'ai',
                message: outputText
            }
        setItems(oldItems => [...oldItems, obj])
        })
        .catch(error => {
            console.error(error);
        });
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
                        <div style={{display: "flex", marginTop: "1em", margin: "auto", height: "fit-content"}}>

                            <h1 style={{ 
                                margin: "auto"}}><b>LamChat</b></h1>

                            <img src={lamLogo}  
                                style={{height: "100px", 
                                width: "100px", 
                                marginTop: "auto", 
                                marginBottom: "auto"}} 
                                alt="llama logo"></img>
                            </div>
                        
                        <p className="ml-30">Examples</p>
                        <div className="example-group">
                            <div onClick={() => update("write an email from bullet lists")}>write an email from bullet lists</div>
                            <div onClick={() => update("code a snake game")}>code a snake game</div>
                            <div onClick={() => update("Assist in a task")}>Assist in a task</div>
                        </div>
                    </div>}
                    {items.map((item) => { return(
                    <div className={item.user}>
                        <div className="user-icon">{item.user === "user" ? "t" : "ai"}</div>
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