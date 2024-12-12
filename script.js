const factElement = document.getElementById('fact');
const resultElement = document.getElementById('result');
const trueButton = document.getElementById('true-btn');
const falseButton = document.getElementById('false-btn');

// Current fact object
let currentFact = { text: "", isTrue: true };

// Fetch a random fact from API and decide if it's true or false
async function fetchRandomFact() {
    try {
        const response = await fetch("https://uselessfacts.jsph.pl/random.json?language=en");
        const data = await response.json();

        // Decide if the fact will be true or false
        const isTrue = Math.random() > 0.5;
        const factText = isTrue ? data.text : generateFakeFact(data.text);

        currentFact = { text: factText, isTrue };
        factElement.textContent = currentFact.text;

        // Reset background and result
        resultElement.textContent = "";
        document.body.style.backgroundColor = "#f4f4f9";
    } catch (error) {
        console.error("Error fetching fact:", error);
        factElement.textContent = "Unable to load a fact. Please try again.";
    }
}

// Generate a fake fact by modifying the original fact
function generateFakeFact(originalFact) {
    const fakeEndings = [
    "but recent studies have disproven this.",
	"And this is completely true.",
    "however, experts argue against this claim.",
    "which contradicts historical evidence.",
	"Proven.",
    "although scientific analysis shows it to be false.",
	"Supported by reliable evidence."
];

    const randomEnding = fakeEndings[Math.floor(Math.random() * fakeEndings.length)];
    return originalFact + " " + randomEnding;
}

// Check if the user's answer is correct
function checkAnswer(userAnswer) {
    if (userAnswer === currentFact.isTrue) {
        resultElement.textContent = "Correct! 🎉";
        resultElement.style.color = "green";
        document.body.style.backgroundColor = "#d4edda"; // Light green
    } else {
        resultElement.textContent = "Wrong! 😞";
        resultElement.style.color = "red";
        document.body.style.backgroundColor = "#f8d7da"; // Light red
    }
    setTimeout(fetchRandomFact, 2000); // Load a new fact after 2 seconds
}

// Event listeners for the buttons
trueButton.addEventListener('click', () => checkAnswer(true));
falseButton.addEventListener('click', () => checkAnswer(false));

// Fetch the first fact
fetchRandomFact();
