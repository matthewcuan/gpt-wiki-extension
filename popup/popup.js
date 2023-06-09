document.addEventListener("DOMContentLoaded", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // Get current tab
    const currentTab = tabs[0];

    // Get popup elements
    console.log(currentTab.id)
    const urlDisplay = document.getElementById("urlDisplay");
    const isWikipediaArticle = isWikipediaURL(currentTab.url);

    if (isWikipediaArticle) {
      urlDisplay.textContent = "Summary available";

      // Display summarize button in popup
      const summaryButton = document.createElement('button');
      summaryButton.innerText = 'Summarize Article';
      document.body.appendChild(summaryButton)
      summaryButton.addEventListener('click', () => {
        
      })

      // Display settings button in popup
      const settingsButton = document.createElement('button');
      settingsButton.innerText = 'Settings';
      document.body.appendChild(settingsButton)
      settingsButton.addEventListener('click', () => {
        
      })

      // Execute contentScript
      // TO FIX: script only executes once
      chrome.scripting.executeScript({
        target: {tabId: currentTab.id},
        files: ['content-script.js']
      });
    } else {
      urlDisplay.textContent = "Not a Wikipedia article";
    }
  });

  // Listen for contentScript
  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log(message);
    if (message) {
      sendResponse("Received message in background script:" + message)
      urlDisplay.textContent = "Article Title: " + message;
      summary = document.getElementById("summary");
      chrome.runtime.sendMessage({ action: "generateSummary", message }, function (response) {
        if (response.summary) {
          summary.textContent = response.summary;
        } else {
          summary.textContent = response.error;
        }
      });
    }     
  });
});
  
function isWikipediaURL(url) {
  // Check if the URL contains the Wikipedia domain and "/wiki/" in the path
  return url.includes("wikipedia.org") && url.includes("/wiki/");
}

async function generateSummary(topic) {
  try {
    const response = await fetch("../background", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic: topic }),
    });

    const data = await response.json();
    if (response.status !== 200) {
      throw data.error || new Error(`Request failed with status ${response.status}`);
    }

    return data.result
  } catch(error) {
    // Consider implementing your own error handling logic here
    console.error(error);
    alert(error.message);
  }
}
