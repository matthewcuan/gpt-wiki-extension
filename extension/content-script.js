console.log("scraping")

// Extract the article title
const title = document.querySelector("#firstHeading").textContent;
const introHTML = document.querySelector("#mw-content-text .mw-parser-output p");
const intro = introHTML.textContent

// send article title to popup
chrome.runtime.sendMessage({ title : title, intro : intro }, (response) => {
    console.log(response)
});

function filterTextFromHTML(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
  
    // Extract the text content from the document
    const textContent = doc.body.textContent;
  
    return textContent;
};