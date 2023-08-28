import React from "react";
import { useState } from "react";
import PromptField from "./PromptField";
import Message from "./Message";
import Example from "./Example";
import Header from "./Header";
import './styles/main.css'

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
                <Header />
                <section className="main-section">
                    <section className="chat-section">
                        {banner && <Example />}
                        {items.map((item) => { return(
                            <Message
                                className={item.user}
                                userIconClass="user-icon" 
                                userIcon="T"
                                message={item.message}
                            />)
                        })}

                    </section>
                    <PromptField
                        className="prompt-field"
                        placeholder="Ask me anything"
                        value={value} 
                        onChange={ e => setValue(e.target.value)}
                        onClick={handleClick} 
                    />
                </section>
            </main>
        </div>
    )
}

export default App
