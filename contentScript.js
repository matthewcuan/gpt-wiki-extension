// Extract the article title
const articleTitle = document.querySelector("#firstHeading").textContent;

// Extract the first paragraph
const firstParagraph = document.querySelector("#mw-content-text p").textContent;

// Create a message object with the extracted content
const message = {
  articleTitle: articleTitle,
  firstParagraph: firstParagraph
};

// Send the message to the extension's popup or background script
chrome.runtime.sendMessage(message);
