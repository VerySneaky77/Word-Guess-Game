const guessMax = 10;
const wordBank = ["lion", "tiger", "ant", "baboon", "beetle", "wildebeast", "platypus", "hawk", "eagle", "vulture", "kangaroo", "hyena", "antelope", "elephant", "rhinocerous", "hippopotamus", "cheetah", "meerkat"];

// HTML elems
var guessOut = document.getElementById("guess-count");
var wordOut = document.getElementById("word");
var postOut = document.getElementById("post-outcome");
var guessBankShow = document.getElementById("guess-bank");

var guessBank = [];
var guessCurr = "";
var wordCurr = "";
var wordVeil = "";

var wordCurrIndex = -1;
var wordPrevIndex = -1;

// Indicates end of game if 0 or 1
var endGame = -1;

// Game startup
resetWord();
updateUI();

// Keypress listening
document.onkeyup = function (event) {
    // There are still attempts left to guess
    if (guessCurr > 0 && event.which > 64 && event.which < 91) {
        // Check if previously guessed
        if (!guessBank.includes(event.key)) {
            var indexCheck = wordCurr.includes(event.key);

            guessBank.push(event.key);

            if (indexCheck) {
                var temp = "";

                // Rewrite corrected guessed letters
                for (var i = 0; i < wordCurr.length; i++) {
                    if (wordCurr[i] === event.key) {
                        temp += event.key;
                    }
                    else if (wordVeil[i] !== "_") {
                        temp += wordVeil[i];
                    }
                    else {
                        temp += "_";
                    }
                };
                // Show progress
                wordVeil = temp;

                // Word match, end session
                if (!wordVeil.includes("_")) {
                    guessCurr = 0;
                    gameEnd(true);
                }
            }
            else { guessCurr--; }
        }

        // Out of guesses, loss, end
        if ((guessCurr === 0) && (wordVeil !== wordCurr)) {
            wordVeil = wordCurr;
            gameEnd(false);
        }
        updateUI();
    }
    // Reset session
    else if (guessCurr === 0) {
        resetWord();
        updateUI();
    }
}

// Reset word for guessing and player parameters
function resetWord() {
    while (wordCurrIndex === wordPrevIndex) {
        wordCurrIndex = Math.floor((Math.random()) * (wordBank.length - 1));
    }
    wordCurr = wordBank[wordCurrIndex];
    wordVeil = "";
    guessCurr = guessMax;
    guessBank = [];

    for (var i = 0; i < wordCurr.length; i++) {
        wordVeil = wordVeil + "_";
    }
    wordPrevIndex = wordCurrIndex;
    postOut.innerText = "";
}

function gameEnd(win) {
    if (win) {
        postOut.innerText = "Good Job! Press any key to reset.";
    }
    else {
        postOut.innerText = "Better luck next time. Press any key to reset.";
    }
}

// Update all HTML, show player progress
function updateUI() {
    var showGuess = "";

    wordOut.innerText = wordVeil;
    guessOut.innerText = guessCurr;
    guessBankShow.innerText = "";
    guessBank.forEach(function (guess) {
        showGuess += " " + guess.toUpperCase() + " ";
    })

    guessBankShow.innerText = showGuess;
}