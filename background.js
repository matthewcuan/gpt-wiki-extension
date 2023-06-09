chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "generateSummary") {
    generateSummary(request.topic)
      .then(summary => {
        sendResponse({ summary });
      })
      .catch(error => {
        sendResponse({ error: error.message });
      });
    return true; // Required to indicate an asynchronous response
  }
});

async function generateSummary(topic) {
  const response = await fetch("https://cors-anywhere.herokuapp.com/https://api.openai.com/v1/chat/completions/gpt-3.5-turbo", {
    method: "POST",
    headers: {
      "Authorization": "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",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      prompt: `Summarize ${topic}`,
      max_tokens: 100
    })
  });

  const data = await response.json();

  if (response.ok) {
    return data.choices[0].text;
  } else {
    throw new Error(data.error.message);
  }
}
