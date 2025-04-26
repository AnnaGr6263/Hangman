# Hangman Game

## Project Description

A classic **Hangman** game developed using **HTML**, **CSS**, and **JavaScript**.  
The game is fully responsive and works seamlessly on both desktop and mobile devices, including those without a mouse pointer.

### Features

- When the game loads, a random word is selected from a predefined list.
- The user sees a series of underscores or symbolic squares representing the number of letters in the selected word.
- The user is presented with tiles containing all letters of the alphabet available in the selected language.
- The goal is to guess the randomly selected word by choosing the correct letters.
- On each turn, the user can click on one of the available letter tiles.
- After a letter is clicked:
  - The chosen tile highlights in blue.
  - If the selected letter exists in the word, it appears in the corresponding positions above the underscores.
  - If the letter is incorrect, a new element of the hangman (gallows and figure) is drawn.
- Clicking a tile that has already been highlighted in blue does not trigger any action.
- The user wins the game if they guess the entire word before the full hangman figure is drawn.
- If the hangman is completed before the word is guessed, the user loses the game.
- After the game ends, the player is notified of the result and can start a new game with a different word.
- The user can cancel the current game at any moment.

### Additional Functionalities

- **Responsive Design:** The game adapts to different screen sizes and supports touch devices without mouse input.
- **Persistence with localStorage:** The current game state is saved in the browser's localStorage.  
  If the user accidentally closes the browser, they can continue from where they left off when they reopen the page.
