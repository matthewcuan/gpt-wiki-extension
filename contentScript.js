console.log("scraping")

// Extract the article title
const message = document.querySelector("#firstHeading").textContent;

// // Extract the first paragraph
// // const firstParagraph = document.querySelector("#mw-content-text p").textContent;

// // Create a message object with the extracted content
// // const message = {
// //   articleTitle: articleTitle,
// //   firstParagraph: firstParagraph
// // };

console.log(message)

// // Send the message to the extension's popup or background script

// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//     if (message.popUpOpened) {
//         console.log("popup opened");
//         sendResponse({ received: true });
//         // chrome.runtime.sendMessage(title);
//     };
// });

chrome.runtime.sendMessage(message, (response) => {
    console.log(response)
});

// console.log("hello world")
// alert('Hello, world!');
