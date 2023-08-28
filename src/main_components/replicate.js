const Replicate = require("replicate");

const replicate = new Replicate({
  auth: 'r8_MikRAjUgm4dBlVjYsIf7zx8hR6Z3ZUs3tanpv'
});

(async () => {
  try {
    const prediction = await replicate.predictions.create({
      version: "2c1608e18606fad2812020dc541930f2d0495ce32eee50074220b87300bc16e1",
      input: { prompt: "Write a poem" },
      stream: true,
    });

    if (prediction && prediction.urls && prediction.urls.stream) {
      const source = new EventSource(prediction.urls.stream, {
        withCredentials: true,
      });

      source.addEventListener("output", (e) => {
        const output = e.data;
        console.log("Output:", output);
      });

      source.addEventListener("error", (e) => {
        console.error("Error:", JSON.parse(e.data));
      });

      source.addEventListener("done", (e) => {
        source.close();
        console.log("Streaming complete.");
      });
    }
  } catch (error) {
    console.error("Error:", error);
  }
})();
