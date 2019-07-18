let squares = Array(9).fill(null);
let xIsNext = true;
const checkWinner = () => {
  const winningSquaresArr = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let winningSquares of winningSquaresArr) {
    let [first, second, third] = winningSquares;
    if (
      squares[first] &&
      squares[first] == squares[second] &&
      squares[second] == squares[third]
    ) {
      return true;
    }
  }
  return false;
};

const renderBoard = () => {
  document.querySelectorAll(".square").forEach(elem => {
    let index = +elem.dataset.index;
    elem.innerText = squares[index];
  });

  let playerStatus = `Next Player: ${xIsNext ? "X" : "O"}`;
  let winningStatus = checkWinner()
    ? `Winner is ${xIsNext ? "O" : "X"}!!!`
    : "";
  let status = document.querySelector(".status");
  status.innerText = winningStatus || playerStatus;
};

const registerEventListener = () => {
  document.addEventListener("click", event => {
    const target = event.target;
    // Check if click on sqaure
    if (target.className == "square") {
      // Check if the square has no value
      let index = +target.dataset.index;
      if (squares[index] || checkWinner()) return;
      squares[index] = xIsNext ? "X" : "O";
      target.innerText = squares[index];
      xIsNext = !xIsNext;
      renderBoard();
    }
  });
};
renderBoard();
registerEventListener();