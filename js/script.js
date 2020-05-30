const ALPHABET = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";

let GAME;

class DefaultWordGame {
    constructor(enteredText, startLevel) {
        this.enteredText = enteredText;
        this.startLevel = startLevel;
        this.level = startLevel;
        this.removedLetters = [];
        this.points = 0;
        this.solutionText = this.enteredText;
    }

    generateGameText() {
        if (this.removedLetters.length < this.level) {
            const lettersToAdd = this.level - this.removedLetters.length;
            for(let i = 0; i < lettersToAdd; i++) {
                this.removedLetters.push(createRandomLetter());
            }
            this.removedLetters.sort();
        }
        this.replaceLetters();
    }

    replaceLetters() {
        for (let i = 0; i < this.removedLetters.length; i++) {
            this.solutionText = replaceSymbolInText(this.solutionText, this.removedLetters[i]);
        }
    }

}

function submitGameTextAndSettings() {
    let enteredText = document.forms["game-settings"]["user-text"].value;
    /*let regex = '*'; // TODO: create a real regex
    if (!regex.test(enteredText)) {
      alert("Текст может содержать только кириллицу, цифры и знаки препинания.");
      return false;
    }*/
    let startLevel = document.forms["game-settings"]["start-level"].value;
    GAME = new DefaultWordGame(enteredText, startLevel);
    document.getElementsByClassName('entering-text')[0].style.display = 'none';
    updateTextOnScreen();
  }
  
function updateTextOnScreen() {
    GAME.generateGameText();
    document.forms["game-content"]["game-text"].value = GAME.solutionText;
    document.getElementsByClassName("removed-letters")[0].innerHTML = "Сейчас скрыты буквы: " + GAME.removedLetters;
}

function checkSolution() {
    let solutionText = document.forms["game-content"]["game-text"].value;
    if (solutionText.toLowerCase() === GAME.enteredText.toLowerCase() && GAME.level <= 32) {
        GAME.points += GAME.level * GAME.enteredText.length;
        alert("Отлично! У вас сейчас " + GAME.points + " очков. Переходим на уровень " + ++GAME.level);
        updateTextOnScreen();
    } 
    else if (solutionText.toLowerCase() === GAME.enteredText.toLowerCase()) {
        alert("Поздравляю, вы выиграли и набрали " + GAME.points + " очков!")
        resetGame();
    }
    else if (solutionText.toLowerCase() !== GAME.enteredText.toLowerCase()) {
        alert("Увы, неверно. Вы проиграли, но успели набрать " + GAME.points + " очков.")
        resetGame();
    }
}

function createRandomLetter() {
    let char = ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
    if(GAME.removedLetters.includes(char)) {
        return createRandomLetter();
    }
    return char;
}

function replaceSymbolInText(text, symbol, replacement = "*") {
    if (symbol !== replacement) {
        text = text.split(symbol).join(replacement);
    }
    return text;
}

function resetGame() {
    GAME = null;
    document.forms["game-settings"]["user-text"].value = "";
    document.forms["game-content"]["game-text"].value = "";
    document.forms["game-settings"]["start-level"].value = 1;
    document.getElementsByClassName('entering-text')[0].style.display = 'block';
    document.getElementsByClassName("removed-letters")[0].innerHTML = "";
}