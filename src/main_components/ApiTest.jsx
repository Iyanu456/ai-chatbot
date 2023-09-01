import React, { useState } from "react";

function ApiExample() {
  const [responseMessage, setResponseMessage] = useState("");

  const handleClick = async () => {
    try {
      const response = await fetch("https://ai-chatbot-next-api.vercel.app/api/endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key: "Hello, World!" }),
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
      <button onClick={handleClick}>Send Hello, World!</button>
      <p>Response: {responseMessage}</p>
    </div>
  );
}

export default ApiExample;
