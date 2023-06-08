const title = ""

console.log("im alive")

// Listen for a message from the content script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // Check if the message contains the expected data
  if (message.data) {
    console.log("Received message in background script:", message.data);

    // Perform actions with the received data
    title = message.data
  }
});

chrome.action.onClicked.addListener((tab) => {
  console.log("popup opened")
  chrome.runtime.sendMessage(title)
});