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
      notice = document.getElementById("notice");

      // Execute content script
      try {
        chrome.scripting.executeScript({
          target: {tabId: currentTab.id},
          files: ['content-script.js']
        });
      } catch(error) {
        // TODO: handle error
      }
      
    } else {
      urlDisplay.textContent = "Not a Wikipedia article";
      notice.textContent = "This extension only works on Wikipedia articles."
    }
  });

  // Listen for contentScript
  chrome.runtime.onMessage.addListener( async function (message, sender, sendResponse) {
    if (message.title) {
      sendResponse("Received message in background script: " + message.title)
      urlDisplay.textContent = message.title;
      notice.textContent = "";
      summary.textContent = "Generating summary..."
      generateSummary(message.intro);    
    }
  });
});
  
function isWikipediaURL(url) {
  // Check if the current tab is a Wikipedia article
  return url.includes("wikipedia.org") && url.includes("/wiki/");
}

// Send API request to background.js
async function generateSummary(data) {
  chrome.runtime.sendMessage({ action: "generateSummary", intro : data }, (response) => {
    // Check if server is running
    if (response.fact) {
      summary.innerHTML = response.fact;
    // If not running, display error 
    } else if (response.error) {
      notice.textContent = "Server is not running. Check README for instructions.";
      summary.textContent = "";
    }
  })
}


