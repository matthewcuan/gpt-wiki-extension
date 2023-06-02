document.addEventListener("DOMContentLoaded", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentTab = tabs[0];
      const urlDisplay = document.getElementById("urlDisplay");
      urlDisplay.append(currentTab.url);
    });
  });
  