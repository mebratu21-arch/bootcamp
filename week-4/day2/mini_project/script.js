const quotes = [
    {
        text: "Life is like a landscape. You live in the midst of it but can describe it only from the vantage point of distance.",
        author: "Charles Lindbergh"
    },
    {
        text: "The purpose of our lives is to be happy.",
        author: "Dalai Lama"
    },
    {
        text: "In the middle of difficulty lies opportunity.",
        author: "Albert Einstein"
    }
];

let lastQuote = -1;

document.getElementById("generate-btn").addEventListener("click", () => {
    let random;

    do {
        random = Math.floor(Math.random() * quotes.length);
    } while (random === lastQuote);

    lastQuote = random;

    document.getElementById("quote-text").textContent = quotes[random].text;
    document.getElementById("quote-author").textContent = quotes[random].author;
});
