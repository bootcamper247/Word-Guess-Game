var wins = 0;
var losses = 0;
var guessesLeft = 6;
var wordBank = ["amazon", "rhine", "zambezi", "nile", "thames", "yangtzei", "ohio",  "yukon"];

var factBank = [];
var wordToGuess = "";
var roundNumber = 0;
var goodGuesses = [];
var badGuesses = [];
var startNextRound = false;
var letterMatched = false;
var wordMatched = false;
var showtxt = "";
var gameOver = false;
var mySound_over;


function startGame() {
mySound_over = new sound("assets/audio/gameover.mp3");
mySound_win = new sound("assets/audio/win.mp3");
mySound_lose = new sound("assets/audio/lose.mp3");
}

myInstructions = "Press Any Key To Get Started";
resetRound();

document.onkeyup = function (event) {
    


if(gameOver == false){

    //store key to check against word
    keyPressed = event.key.toLowerCase();

    if (startNextRound == true) {
        resetRound();
        document.getElementById("river-img").src = "assets/images/titleimage.png";
        document.getElementById("caption").innerHTML = "Guess The Rivers";
    } else {

        checkLetter(keyPressed);
        if (letterMatched === true) {
            checkWord();
            if (wordMatched === true) {
                youWin();
            }
        }
        else {
            if (keyPressed >= 'a' && keyPressed <= 'z' && keyPressed.length == 1) {
                storeBadGuess(keyPressed.toUpperCase());
                if (guessesLeft <= 0) {
                    youLose();
                }
            }
        }
        myInstructions = "Press Any Key To Continue";
        displayStats();
        if(roundNumber >= wordBank.length && startNextRound == true){
            gameOver = true;
            document.getElementById("instructions").innerHTML = "Game Over";
            mySound_over.play();
        }
    }
}

};
//Function for audio
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}

//Function to store incorrect keys to array
function storeBadGuess(key) {

    if (badGuesses.indexOf(key) == -1) {
        guessesLeft--;
        badGuesses.push(key);
    }
}

function youWin() {
    document.getElementById("goodGuesses").innerHTML = goodGuesses.join("&nbsp&nbsp");
    wins++;
    startNextRound = true;
    showtxt = "You Got It!";
    mySound_win.play();    
}

function youLose() {
    losses++;
    startNextRound = true;
    showtxt = "It was " + wordToGuess.toUpperCase();
    mySound_lose.play();
}

function resetRound() {
    startNextRound = false;
    goodGuesses = ["&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp"];
    guessesLeft = 6;
    roundNumber++;
    badGuesses = [];
    wordToGuess = wordBank[roundNumber - 1]
    displayLines();
    displayEmptyGoodGuesses();
    displayStats();
}

//Clear out the word for new round
function displayEmptyGoodGuesses() {
    document.getElementById("goodGuesses").innerHTML = goodGuesses.join(" ");
}

function displayLines() {
    var lines = [];
    for (i = 0; i < wordToGuess.length; i++) {
        lines[i] = ("-");
    }
    document.getElementById("lines").innerHTML = lines.join("&nbsp&nbsp");
}

//Display current values
function displayStats() {
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("guessesLeft").innerHTML = guessesLeft;
    document.getElementById("roundNumber").innerHTML = roundNumber + " of " + wordBank.length;
    document.getElementById("goodGuesses").innerHTML = goodGuesses.join("&nbsp&nbsp");
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("badGuesses").innerHTML = badGuesses.join("&nbsp&nbsp");
    document.getElementById("instructions").innerHTML = myInstructions;
    if(showtxt != ""){
        document.getElementById("river-img").src = "assets/images/" + wordBank[roundNumber-1]+".png";
        document.getElementById("caption").innerHTML = showtxt;
        showtxt = "";
    }
}

// check if key is part of word and log it accordingly
function checkLetter(key) {
    var pos = 0;
    letterMatched = false;
    getIndex = wordToGuess.indexOf(key, pos);
    while (getIndex != -1) {
        letterMatched = true;
        goodGuesses[getIndex] = key;
        document.getElementById("goodGuesses").innerHTML = goodGuesses.join("&nbsp&nbsp");
        pos = getIndex + 1;
        getIndex = wordToGuess.indexOf(key, pos);
    }
}

//check if word matches
function checkWord() {
    wordMatched = true;
    for (i = 0; i < wordToGuess.length; i++) {
        if (wordToGuess[i] != goodGuesses[i]) {
            wordMatched = false;
        }
    }
}