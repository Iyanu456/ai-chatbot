import React, { useState } from "react";

function ApiExample() {
  const [inputValue, setInputValue] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key: inputValue }), // Adjust the data you want to send
      });

      const data = await response.json();
      setResponseMessage(data.message);
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("An error occurred");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Input:
          <input type="text" value={inputValue} onChange={handleInputChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
      <p>Response: {responseMessage}</p>
    </div>
  );
}

export default ApiExample;
