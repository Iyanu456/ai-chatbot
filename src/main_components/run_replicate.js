const Replicate = require("replicate");

async function runReplicate(prompt) {
  const replicate = new Replicate({
    auth: 'r8_MikRAjUgm4dBlVjYsIf7zx8hR6Z3ZUs3tanpv'
  });

  try {
    const output = await replicate.run(
      "replicate/llama-2-70b-chat:2c1608e18606fad2812020dc541930f2d0495ce32eee50074220b87300bc16e1",
      {
        input: {
          prompt: prompt,
        },
      }
    );

    // Join the array elements into a single string
    const fullText = output.join(" ");
    return fullText;
  } catch (error) {
    console.error("Error:", error);
    return "An error occurred.";
  }
}

export default runReplicate
// Example usage
const prompt = "Write a poem about open source machine learning in the style of Mary Oliver.";
runReplicate(prompt)
  .then(outputText => {
    console.log(outputText);
  })
  .catch(error => {
    console.error(error);
  });
