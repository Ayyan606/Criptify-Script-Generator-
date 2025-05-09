async function generateScript() {
  const input = document.getElementById("topicInput").value;
  const output = document.getElementById("output");
  output.innerText = "Generating script...";

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Referer": "https://Criptify.app", 
        "X-Title": "Criptify - Script Generator",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-prover-v2:free",
        messages: [
          {
            role: "system",
            content: "What is the meaning of life?"
          },
          {
            role: "user",
            content: input
          }
        ]
      })
    });

    // Check if response is OK
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    const message = data.choices?.[0]?.message?.content || "No response.";
    output.innerText = message;
  } catch (error) {
    console.error("Error:", error);
    output.innerText = "An error occurred while generating the script.";
  }
}