// let title

console.log("i am service worked")

// // Listen for a message from the content script
// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//   // Check if the message contains the expected data
//   if (message) {
//     title = message.data
//     console.log(message.data)
//     console.log(title)
//     console.log("Received message in background script:", message);
//     sendResponse("Received message in background script:" + message)
//     // Perform actions with the received data
    
//   }
// });

// chrome.action.onClicked.addListener((tab) => {
//   console.log("popup opened")
//   chrome.runtime.sendMessage(title)
// });

// background.js
chrome.action.onClicked.addListener((tab) => {
  console.log("popup opened")
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['contentScript.js']
  });
});
