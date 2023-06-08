document.addEventListener("DOMContentLoaded", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTab = tabs[0];
    console.log(currentTab.id)
    const urlDisplay = document.getElementById("urlDisplay");
    const isWikipediaArticle = isWikipediaURL(currentTab.url);

    if (isWikipediaArticle) {
      urlDisplay.textContent = "Summary available: ";
      // chrome.tabs.sendMessage(currentTab.id, { popupOpened: true });
    } else {
      urlDisplay.textContent = "Not a Wikipedia article";
    }
  });

  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log(message);
    urlDisplay.textContent = "Article Title: " + message;
  });
});
  
function isWikipediaURL(url) {
  // Check if the URL contains the Wikipedia domain and "/wiki/" in the path
  return url.includes("wikipedia.org") && url.includes("/wiki/");
}
