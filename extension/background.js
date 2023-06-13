chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "generateSummary") {
    generateSummary(request.topic)
      .then(response => {
        console.log("received, sending " + response)
        sendResponse({ fact : response });
      })
      .catch(error => {
        sendResponse({ error: error.message });
      });
    return true; // Required to indicate an asynchronous response
  }
});

async function generateSummary(topic) {
  try {
    const response = await fetch("http://localhost:3000/api/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic: topic }),
    });

    console.log("request sent")
    const data = await response.json();
    if (response.status !== 200) {
      throw data.error || new Error(`Request failed with status ${response.status}`);
    }

    console.log(data.result)
    return data.result
  } catch(error) {
    // Consider implementing your own error handling logic here
    console.error(error);
    alert(error.message);
  }
}