const Replicate = require("replicate");
const axios = require("axios");

async function main() {
  const replicate = new Replicate({ auth: 'r8_MikRAjUgm4dBlVjYsIf7zx8hR6Z3ZUs3tanpv' });

  const prediction = await replicate.predictions.create({
    version: "2c1608e18606fad2812020dc541930f2d0495ce32eee50074220b87300bc16e1",
    input: { prompt: "Tell me a very short story" },
    stream: true,
  });

  // Use axios to get the streaming data
  const response = await axios.get(prediction.urls.stream, { responseType: "stream" });

  response.data.on("data", (chunk) => {
    console.log("output", chunk.toString());
  });

  response.data.on("error", (error) => {
    console.error("error", error);
  });

  response.data.on("end", () => {
    console.log("done");
  });
}

main();
