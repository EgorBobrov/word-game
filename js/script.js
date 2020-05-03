let ENTERED_TEXT = "";
let LEVEL = 0;
let REMOVED_LETTERS = [];
let POINTS = 0;
const ALPHABET = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";

function submitGameTextAndSettings() {
    let enteredText = document.forms["game-settings"]["user-text"].value;
    /*let regex = '*'; // TODO: create a real regex
    if (!regex.test(enteredText)) {
      alert("Текст может содержать только кириллицу, цифры и знаки препинания.");
      return false;
    }*/
    let startLevel = document.forms["game-settings"]["start-level"].value;
    ENTERED_TEXT = enteredText;
    LEVEL = startLevel;
    generateGameText();
    document.getElementsByClassName('entering-text')[0].style.display = 'none';
  }
  
function generateGameText() {
    
    if(REMOVED_LETTERS.length < LEVEL) {
        const lettersToAdd = LEVEL - REMOVED_LETTERS.length;
        for(let i = 0; i < lettersToAdd; i++) {
            REMOVED_LETTERS.push(createRandomLetter());
        }
    }
    REMOVED_LETTERS.sort();
    console.log("removed letters: " + REMOVED_LETTERS);
    document.forms["game-content"]["game-text"].value = replaceLetters();
    document.getElementsByClassName("removed-letters")[0].innerHTML = "Сейчас скрыты буквы: " + REMOVED_LETTERS;
}

function checkSolution() {
    let solutionText = document.forms["game-content"]["game-text"].value;
    if (solutionText.toLowerCase() === ENTERED_TEXT.toLowerCase() && LEVEL <= 32) {
        POINTS += LEVEL * ENTERED_TEXT.length;
        alert("Отлично! У вас сейчас " + POINTS + " очков. Переходим на уровень " + ++LEVEL);
        generateGameText();
    } 
    else if (solutionText.toLowerCase() === ENTERED_TEXT.toLowerCase()) {
        alert("Поздравляю, вы выиграли и набрали " + POINTS + " очков!")
        resetGame();
    }
    else if (solutionText.toLowerCase() !== ENTERED_TEXT.toLowerCase()) {
        alert("Увы, неверно. Вы проиграли, но успели набрать " + POINTS + " очков.")
        resetGame();
    }
}

function createRandomLetter() {
    let char = ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
    if(REMOVED_LETTERS.includes(char)) {
        return createRandomLetter();
    }
    return char;
}

function replaceLetters() {
    let text = ENTERED_TEXT;
    for (let i = 0; i < REMOVED_LETTERS.length; i++) {
        text = replaceLetterWithAsterisk(text, REMOVED_LETTERS[i]);
    }
    return text;
}

function replaceLetterWithAsterisk(text, letter) {
    console.log("letter: "+letter);
    console.log(text + " before replacement");
    text = text.split(letter).join("*");
    console.log(text + " after replacement");
    return text;
}

function resetGame() {
    ENTERED_TEXT = "";
    LEVEL = 0;
    REMOVED_LETTERS = [];
    POINTS = 0;
    document.forms["game-settings"]["user-text"].value = "";
    document.forms["game-content"]["game-text"].value = "";
    document.forms["game-settings"]["start-level"].value = 1;
    document.getElementsByClassName('entering-text')[0].style.display = 'block';
    document.getElementsByClassName("removed-letters")[0].innerHTML = "";
}