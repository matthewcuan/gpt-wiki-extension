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
      notice.textContent = "Please refresh the page and run the extension again."

      // // Display summarize button in popup
      // const summaryButton = document.createElement('button');
      // summaryButton.innerText = 'Summarize Article';
      // document.body.appendChild(summaryButton)
      // summaryButton.addEventListener('click', () => {
        
      // })

      // // Display settings button in popup
      // const settingsButton = document.createElement('button');
      // settingsButton.innerText = 'Settings';
      // document.body.appendChild(settingsButton)
      // settingsButton.addEventListener('click', () => {
        
      // })

      // Execute contentScript
      // TO FIX: script only executes once upon opening
      chrome.scripting.executeScript({
        target: {tabId: currentTab.id},
        files: ['content-script.js']
      });
    } else {
      urlDisplay.textContent = "Not a Wikipedia article";
      notice.textContent = "This extension only works on Wikipedia articles."
    }
  });

  // Listen for contentScript
  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.title) {
      console.log(message.title)
      console.log(message.intro)
      sendResponse("Received message in background script: " + message.title)
      urlDisplay.textContent = message.title;
      console.log(message.intro)
      notice.textContent = "Server is not running. Check README for instructions."
      chrome.runtime.sendMessage({ action: "generateSummary", intro : message.intro }, (response) => {
        if (response.fact) {
          summary.textContent = "Loading..."
          console.log(response.fact)
          summary.innerHTML = response.fact;
        }
      })
    } else {
      
    } 
  });
});
  
function isWikipediaURL(url) {
  // Check if the URL contains the Wikipedia domain and "/wiki/" in the path
  return url.includes("wikipedia.org") && url.includes("/wiki/");
}


