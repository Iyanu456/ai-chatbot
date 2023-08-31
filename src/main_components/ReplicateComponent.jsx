import React, { useState } from "react";
import Replicate from "replicate";

function ReplicateComponent() {
  const [promptText, setPromptText] = useState("");
  const [outputText, setOutputText] = useState("");

  const handleInputChange = (event) => {
    setPromptText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const replicate = new Replicate({ auth: 'ggcgjcjtv' });

    const prediction = await replicate.predictions.create({
      version: "2c1608e18606fad2812020dc541930f2d0495ce32eee50074220b87300bc16e1",
      input: { prompt: promptText },
      stream: true,
    });

    const source = new EventSource(prediction.urls.stream, {
      withCredentials: true,
    });

    source.addEventListener("output", (e) => {
      setOutputText(e.data);
    });

    source.addEventListener("error", (e) => {
      console.error("error", JSON.parse(e.data));
    });

    source.addEventListener("done", (e) => {
      source.close();
      console.log("done", JSON.parse(e.data));
    });
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input type="text" value={promptText} onChange={handleInputChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
      <div>
        <p>Output: {outputText}</p>
      </div>
    </div>
  );
}

export default ReplicateComponent;
