// Listen for request from extension popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "generateSummary") {
    console.log(request.intro)
    generateSummary(request.intro)
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

// Send request to chatGPT API
async function generateSummary(intro) {
  try {
    const response = await fetch("http://localhost:3000/api/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ intro: intro }),
    });

    const data = await response.json();
    if (response.status !== 200) {
      console.log(data.error)
    }

    return data.result
  } catch(error) {
    throw error
  }
}