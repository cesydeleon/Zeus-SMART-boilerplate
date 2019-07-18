document.addEventListener("DOMContentLoaded", function(event){
  //////////////////////////////
  // Setup the game
  /////////////////////////////
  let secretsList = ["cat", "dog", "boy", "orange", "ball"];
  // Choose a secret word
  let secretWord = secretsList[Math.floor(Math.random() * secretsList.length)];
  
  // You can only guess wrong 6 times
  let maxWrongGuesses = 6;
  let wrongGuesses = 0; // The number of times you have guessed wrong
  let correctGuesses = 0; // The number of letters you found correctly
  let guesses = []; // All the guesses you have made

  let $wordSpaces = $("#word-spaces");
  let $submitGuess = $("#submit-guess");
  let $guessInput = $("#guess-input");
  let $wrongGuesses = $("#wrong-guesses");

  for (let i = 0; i < secretWord.length; i++) {
    $wordSpaces.append(`<div id="word-space-${i}" class="word-space"></div>`);
  }

  //////////////////////////////
  // Check a guess
  /////////////////////////////
  $submitGuess.click(() => {
    let guess = $guessInput.val().toLowerCase();
    if (!isOkGuess(guess)) {
      $guessInput.val("");
      return;
    }
    let foundPositions = [];
    for (let i = 0; i < secretWord.length; i++) {
      if (secretWord[i].toLowerCase() === guess) {
        foundPositions.push(i);
      }
    }

    if (foundPositions.length > 0) {
      for (let i = 0; i < foundPositions.length; i++) {
        $(`#word-space-${foundPositions[i]}`).html(guess);
      }
      correctGuesses = correctGuesses + foundPositions.length;
    } else {
      $wrongGuesses.append(`<div class="wrong-guess">${guess}</div>`);
      wrongGuesses = wrongGuesses + 1;
    }
    guesses.push(guess);
    $guessInput.val("");
    if (wrongGuesses >= maxWrongGuesses) {
      alert("You lose! :(");
      $submitGuess.off('click');
    } else if (correctGuesses >= secretWord.length) {
      alert("You won! :)");
      $submitGuess.off('click');
    }
  });

  //////////////////////////////
  // Make sure the guess is a single letter
  // '' is wrong
  // '6' is wrong
  // 'ga' is wrong
  // 'b' is correct
  /////////////////////////////
  function isOkGuess(guess) {
    if (guess.length === 0) {
      alert("You didn't guess anything!");
      return false;
    }
    if (!isLetter(guess)) {
      alert('That is not a letter!');
      return false;
    }
    if (guesses.indexOf(guess) >= 0) {
      alert("You already guessed that!");
      return false;
    }
    return true;
  }

  //////////////////////////////
  // Check that guess is a letter
  /////////////////////////////
  function isLetter(guess) {
    return guess.match(/[a-z]/i);
    // return (65 <= guess.charCodeAt(0) <= 90) || (97 <= guess.charCodeAt(0) <= 122);
  }
});
