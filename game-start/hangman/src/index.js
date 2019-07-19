const allLetters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

$(document).ready(function() {
  //////////////////////////////
  // Setup the game
  /////////////////////////////
  let secretsList = ["cat"]; // <------------ enter more words here
  // Choose a secret word randomly from secretsList
  let secretWord = secretsList[Math.floor(Math.random() * secretsList.length)];

   // You can only guess wrong 6 times (head, body, left arm, right arm, left leg, rigth leg)
  let maxWrongGuesses = 6;
  let wrongGuesses = 0; // The number of times you have guessed wrong
  let correctGuesses = 0; // The number of letters you found correctly
  let guesses = []; // All the guesses you have made

  let $wrongGuesses = $("#wrong-guesses");

   for (let i = 0; i < secretWord.length; i++) {
     let g = $("#word-spaces")
     g.append(`<div id="word-space-${i}" class="word-space"></div>`);
   }

  //////////////////////////////
  // Check a guess
  /////////////////////////////
  function handleGuess() {
   let letter = $("#guessbox").val()
   let existingindex = guesses.indexOf(letter)
   if (existingindex >= 0){
     $("#guessbox").val("")
     $("#error").css("display", "block")
     return
    }
   guesses.push(letter)
   // check if letter is inside secretWord
    let index = secretWord.indexOf(letter)
    if (index == -1) {
      // alert("wrong answer " + letter) 
      $('#wrong-guesses').append(letter)
      wrongGuesses = wrongGuesses + 1
    } else {
      // alert("correct answer " + letter)
      $('#word-space-' + index).append(letter)
      correctGuesses = correctGuesses + 1
      if (correctGuesses ==secretWord.length){
        $("#endofgame").css("display", "block")
      }

    }
  if (wrongGuesses == 6){alert('You Lost')}

  }

$("#enterbutton").click(handleGuess)
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
    return allLetters.includes(guess);
  }
});
