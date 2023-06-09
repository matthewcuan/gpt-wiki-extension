console.log("scraping")

// Extract the article title
const message = document.querySelector("#firstHeading").textContent;

console.log(message)

// send article title to popup
chrome.runtime.sendMessage(message, (response) => {
    console.log(response)
});