const Replicate = require("replicate");

const replicate = new Replicate({
  auth: 'r8_MikRAjUgm4dBlVjYsIf7zx8hR6Z3ZUs3tanpv'
});

(async () => {
  try {
    const output = await replicate.run(
      "replicate/llama-2-70b-chat:2c1608e18606fad2812020dc541930f2d0495ce32eee50074220b87300bc16e1",
      {
        input: {
          prompt:
            "Write a poem about open source machine learning in the style of Mary Oliver.",
        },
      }
    );

    // Join the array elements into a single string
    const fullText = output.join(" ");
    console.log(fullText);
  } catch (error) {
    console.error("Error:", error);
  }
})();
