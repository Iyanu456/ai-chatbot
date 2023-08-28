// run.js
const { POST } = require("./replicate");

// Simulate a request object (you can replace this with an actual request object)
const req = {
  json: async () => ({
    prompt: "Your prompt",
    systemPrompt: "Your system prompt",
    maxTokens: 100,
    temperature: 0.7,
    topP: 1.0,
    version: "Your model version",
  }),
};

// Call the POST function
(async () => {
  try {
    const result = await POST(req);
    console.log(result);
  } catch (error) {
    console.error("Error:", error);
  }
})();
