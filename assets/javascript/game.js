const guessMax = 10;
const wordBank = [
    "lion", "tiger", "bear", "wildebeast",
    "platypus", "hawk", "eagle", "vulture",
    "kangaroo", "hyena", "antelope", "elephant",
    "rhinocerous", "hippopotamus", "cheetah", "meerkat"
];

var guessOut = document.getElementById("guesses");
var wordOut = document.getElementById("word");
var guessCurr;
var wordCurr;
var wordToGo;

pickUpWord(" ");
updateUI("");

function pickUpWord(wordPrev) {
    do {
        wordCurr = wordBank[Math.floor((Math.random) * wordBank.length)];
    } while (wordCurr === wordPrev);

    for (var i = 0; i < wordCurr.length; i++) {
        wordToGo = wordToGo + '_';
    }

    guessCur = guessMax;
}

function updateUI() {
    wordOut.innerText = wordToGo;
    guessOut.innerText = guessCurr;
}

document.onkeyup = function (event) {
    var choice = event.key;

    if (guessCurr > 0) {
        if (wordToGo.indexOf("_") > -1) {
            ;
        }
        else if (wordBank.indexOf(event.key) > -1) {
            guessCurr--;
        }
        else { guessCur--; }
    }
    else {
        j;
    }

    updateUI();
}