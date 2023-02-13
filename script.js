const quotesAPI = "https://type.fit/api/quotes";
const quoteContainer = document.querySelector("#quote-container");
const quoteEl = document.querySelector("#quote");
const typingArea = document.querySelector("#typing-area");
const typingInput = document.querySelector("#typing-input");
const messageEl = document.querySelector("#message");
const timeEl = document.querySelector("#time");
const averageTimeEl = document.querySelector("#avg-time");
const scoreEl = document.querySelector("#score");

let quotes = [];
let currentQuoteIndex = Math.floor(Math.random() * 100) + 1;
let score = 0;
let startTime;
let totalTime = 0;
let numberOfAttempts = 0;

// Fetch quotes from API
fetch(quotesAPI)
  .then((response) => response.json())
  .then((data) => {
    quotes = data;
    displayQuote();
  });

// Display quote on screen
function displayQuote() {
  console.log(quotes[currentQuoteIndex]);
  const quote = quotes[currentQuoteIndex].text;
  quoteEl.textContent = quote;
}

// Listen for enter key event
typingArea.addEventListener("submit", (event) => {
  event.preventDefault();
  checkQuote();
});

// Display the first quote and start tracking the time
startTime = new Date();

function checkQuote() {
  const quote = quotes[currentQuoteIndex].text;
  const typedQuote = typingInput.value;
  if (typedQuote === quote) {
    score++;
    scoreEl.textContent = score;
    messageEl.textContent = "";
    quoteContainer.style.borderColor = "";
    typingInput.value = "";

    // Move on to the next quote
    currentQuoteIndex++;

    if (numberOfAttempts === 10) {
      // All quotes have been typed
      const endTime = new Date();
      const timeTaken = (endTime - startTime) / 1000;
      totalTime += timeTaken;
      timeEl.textContent = timeTaken + " seconds";

      // Calculate average time
      const averageTime = totalTime / numberOfAttempts;
      averageTimeEl.textContent = averageTime + " seconds";
      quoteEl.textContent = "";
      return;
    }

    displayQuote();
  } else {
    scoreEl.textContent = score;
    currentQuoteIndex++;
    messageEl.textContent = "Incorrect";
    quoteContainer.style.borderColor = "red";
    // Show modal popup error
    alert("Incorrect!!");
    displayQuote();
  }
  numberOfAttempts++;
}
