document.addEventListener("DOMContentLoaded", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // gets current tab
    const currentTab = tabs[0];

    // executes contentScript
    chrome.scripting.executeScript({
      target: {tabId: currentTab.id},
      files: ['content-script.js']
    });

    // gets popup elements
    console.log(currentTab.id)
    const urlDisplay = document.getElementById("urlDisplay");
    const isWikipediaArticle = isWikipediaURL(currentTab.url);

    if (isWikipediaArticle) {
      urlDisplay.textContent = "Summary available: ";
    } else {
      urlDisplay.textContent = "Not a Wikipedia article";
    }
  });

  // listens for contentScript
  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log(message);
    sendResponse("Received message in background script:" + message)
    urlDisplay.textContent = "Article Title: " + message;
  });
});
  
function isWikipediaURL(url) {
  // Check if the URL contains the Wikipedia domain and "/wiki/" in the path
  return url.includes("wikipedia.org") && url.includes("/wiki/");
}
