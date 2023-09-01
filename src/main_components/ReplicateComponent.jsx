import React, { useState, useEffect } from "react";
import Replicate from "replicate";
import axios from "axios";

function ReplicateComponent() {
  const [promptText, setPromptText] = useState("");
  const [outputText, setOutputText] = useState("");

  useEffect(() => {
    async function fetchData() {
      if (promptText) {
        const replicate = new Replicate({ auth: 'r8_MikRAjUgm4dBlVjYsIf7zx8hR6Z3ZUs3tanpv' });

        const prediction = await replicate.predictions.create({
          version: "2c1608e18606fad2812020dc541930f2d0495ce32eee50074220b87300bc16e1",
          input: { prompt: promptText },
          stream: true,
        });

        const response = await axios.get(prediction.urls.stream, { responseType: "stream" });

        response.data.on("data", (chunk) => {
          setOutputText(chunk.toString());
        });

        response.data.on("error", (error) => {
          console.error("error", error);
        });

        response.data.on("end", () => {
          console.log("done");
        });
      }
    }

    fetchData();
  }, [promptText]);

  const handleInputChange = (event) => {
    setPromptText(event.target.value);
  };

  return (
    <div>
      <h1 style={{ height: "fit-content"}}>Replicate Component Example</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Prompt:
          <input type="text" value={promptText} onChange={handleInputChange} />
        </label>
      </form>
      <div>
        <h2>Output:</h2>
        <p>{outputText}</p>
      </div>
    </div>
  );
}

export default ReplicateComponent;
