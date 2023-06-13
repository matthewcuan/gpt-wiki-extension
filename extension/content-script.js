console.log("scraping")

// Extract the article title
const title = document.querySelector("#firstHeading").textContent;
const paragraph = document.querySelector(".mw-parser-output p");
const filtered = filterTextFromHTML(paragraph);
console.log(filtered);

console.log(title)

// send article title to popup
chrome.runtime.sendMessage({ title: title }, (response) => {
    console.log(response)
});

function filterTextFromHTML(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
  
    // Extract the text content from the document
    const textContent = doc.body.textContent;
  
    return textContent;
};