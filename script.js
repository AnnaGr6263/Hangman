const words = ['JABŁKO', 'KOMPUTER', 'SAMOLOT', 'KSIĄŻKA', 'PROGRAMISTA'];
const alphabet = 'AĄBCĆDEĘFGHIJKLŁMNŃOÓPRSŚTUVWXYZŹŻ';

let chosenWord = '';
let correctGuesses = [];
let mistakes = 0;
const maxMistakes = 6;

// get elements from the HTML
const canvas = document.getElementById('hangmanCanvas');
const ctx = canvas.getContext('2d');
const wordContainer = document.getElementById('wordContainer');
const lettersContainer = document.getElementById('lettersContainer');
const resultDiv = document.getElementById('result');
const restartBtn = document.getElementById('restartBtn');
const cancelBtn = document.getElementById('cancelBtn');

// draw the hang
function drawHangman(m) {
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#000';
  const draw = [
    () => { ctx.beginPath(); ctx.moveTo(10, 240); ctx.lineTo(190, 240); ctx.stroke(); },
    () => { ctx.beginPath(); ctx.moveTo(50, 240); ctx.lineTo(50, 20); ctx.stroke(); },
    () => { ctx.beginPath(); ctx.moveTo(50, 20); ctx.lineTo(150, 20); ctx.lineTo(150, 40); ctx.stroke(); },
    () => { ctx.beginPath(); ctx.arc(150, 55, 15, 0, Math.PI * 2); ctx.stroke(); },
    () => {
      ctx.beginPath(); ctx.moveTo(150, 70); ctx.lineTo(150, 130); ctx.stroke();
      ctx.moveTo(150, 90); ctx.lineTo(130, 110); ctx.stroke();
      ctx.moveTo(150, 90); ctx.lineTo(170, 110); ctx.stroke();
    },
    () => {
      ctx.beginPath(); ctx.moveTo(150, 130); ctx.lineTo(130, 160); ctx.stroke();
      ctx.moveTo(150, 130); ctx.lineTo(170, 160); ctx.stroke();
    },
  ];
  for (let i = 0; i < m; i++) draw[i]();
}

// generate letters buttons
function generateLetters() {
  lettersContainer.innerHTML = '';
  for (let char of alphabet) {
    const btn = document.createElement('button');
    btn.textContent = char;
    btn.className = 'letterBtn';
    if (correctGuesses.includes(char) || guessedLetters.includes(char)) {
      btn.classList.add('used');
      btn.disabled = true;
    }
    btn.addEventListener('click', () => handleGuess(char, btn));
    lettersContainer.appendChild(btn);
  }
}

// display the word with correct guesses
function displayWord() {
  wordContainer.innerHTML = '';
  for (let letter of chosenWord) {
    const span = document.createElement('span');
    span.textContent = correctGuesses.includes(letter) ? letter : '_';
    wordContainer.appendChild(span);
  }
}

// list of letters that were used
let guessedLetters = [];

// choose a random word
function handleGuess(letter, button) {
  if (button.classList.contains('used')) return;

  button.classList.add('used');
  guessedLetters.push(letter);

  if (chosenWord.includes(letter)) { // if the letter is in the word
    correctGuesses.push(letter); // add it to correct guesses
    displayWord(); // update the displayed word

    if (chosenWord.split('').every(l => correctGuesses.includes(l))) {
      endGame(true); // if all letters are guessed - game won
    }
  } else {
    mistakes++;
    drawHangman(mistakes);
    if (mistakes >= maxMistakes) endGame(false);
  }

  saveGame();
}

function endGame(win) {
  resultDiv.textContent = win
    ? '🎉 Wygrałeś! Słowo to: ' + chosenWord
    : '💀 Przegrałeś. Szukane słowo to: ' + chosenWord;

  document.querySelectorAll('.letterBtn').forEach(btn => {
    btn.classList.add('used');
    btn.disabled = true;
  });

  // used localStorage to save the game state
  localStorage.removeItem('hangman-game');
}

function saveGame() {
  const state = {
    chosenWord,
    correctGuesses,
    guessedLetters,
    mistakes
  };
  localStorage.setItem('hangman-game', JSON.stringify(state));
}

function loadGame() {
  const saved = localStorage.getItem('hangman-game');
  if (saved) {
    const state = JSON.parse(saved);
    chosenWord = state.chosenWord;
    correctGuesses = state.correctGuesses;
    guessedLetters = state.guessedLetters;
    mistakes = state.mistakes;
    displayWord();
    generateLetters();
    drawHangman(mistakes);
    return true;
  }
  return false;
}

function resetGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  chosenWord = words[Math.floor(Math.random() * words.length)];
  correctGuesses = [];
  guessedLetters = [];
  mistakes = 0;
  resultDiv.textContent = '';
  displayWord();
  generateLetters();
  saveGame();
}

// event listeners
restartBtn.addEventListener('click', resetGame);
cancelBtn.addEventListener('click', () => {
  localStorage.removeItem('hangman-game');
  location.reload();
});

if (!loadGame()) resetGame();
