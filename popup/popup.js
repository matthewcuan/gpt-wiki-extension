document.addEventListener("DOMContentLoaded", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentTab = tabs[0];
      const urlDisplay = document.getElementById("urlDisplay");
      const isWikipediaArticle = isWikipediaURL(currentTab.url);
  
      if (isWikipediaArticle) {
        urlDisplay.textContent = "Summary available";
        chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
          const urlDisplay = document.getElementById("urlDisplay");
          urlDisplay.textContent.append(message.articleTitle + ": " + message.firstParagraph);
        });
      } else {
        urlDisplay.textContent = "Not a Wikipedia article";
      }
    });
  });
  
  function isWikipediaURL(url) {
    // Check if the URL contains the Wikipedia domain and "/wiki/" in the path
    return url.includes("wikipedia.org") && url.includes("/wiki/");
  }


  