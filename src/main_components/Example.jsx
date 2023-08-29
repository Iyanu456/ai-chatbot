
function Example({handleCick}) {
    const example = [
        {
            prompt: "write an email from bullet lists",
            id: 1
        },
        {
            prompt: "code a snake game",
            id: 2
        },
        {
            prompt: "Assist in a task",
            id: 3
        }
    ]
    return (
        <div className="banner">
            <h1 style={{textAlign: "center"}}><b>LetsChat</b></h1>
            <p className="ml-30">Examples</p>
            
            <div className="example-group">
                {example.map((item) => 
                <div 
                    id={item.id}
                >{item.prompt}</div>)}
            </div>
        </div>
    )
}

export default Example