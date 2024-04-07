const Container = document.querySelector(".container");
const ContainerDetails = document.querySelector(".container .details");
const ContainerBoard = document.querySelector(".container .gameBoard");
const ContainerResult = document.querySelector(".container .result");
var startGameBtn = document.querySelector(".container .details .buttonGo");
var AlertText = document.querySelector(".alert");
var Box = document.querySelectorAll(".gameBoard .board .box");
var turnText = document.querySelector(".turnText");
var WinText = document.querySelector(".winTxt");
var Restart = document.querySelectorAll(".restBtn");
var WinTitle = document.querySelector(".winTitle");

let turns = ["X", "O"];
let randomeindex = Math.floor(Math.random() * turns.length);
let currentTurn = turns[randomeindex];
let allBoxes = [];
let condition, winner;

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checkTie = () => {
  for (let i = 0; i < 9; i++) {
    allBoxes.push(Box[i]);
  }

  condition = allBoxes.every((e) => e.innerText != "");

  if (condition) {
    winner = false;
    ContainerDetails.style.transform = "translate(-350%, -50%)";
    ContainerBoard.style.transform = "translate(-50%, -300%)";
    ContainerResult.style.transform = "translate(-50%, -50%)";

    ContainerDetails.style.transition = ".3s ease-in-out";
    ContainerBoard.style.transition = ".3s ease-in-out";
    ContainerResult.style.transition = ".3s ease-in-out";

    WinTitle.textContent = "Better Luck Next Time :(";

    WinText.textContent = "Its A Draw 50/50 !";
  }
};

const checkWin = () => {
  let first, second, third;

  for (let i = 0; i < winningCombos.length; i++) {
    [first, second, third] = winningCombos[i];

    if (
      (Box[first].textContent,
      Box[second].textContent,
      Box[third].textContent) != ""
    ) {
      if (
        Box[first].textContent &&
        Box[first].textContent == Box[second].textContent &&
        Box[first].textContent == Box[third].textContent
      ) {
        winner = true;
      }
    }
  }

  if (winner) {
    ContainerDetails.style.transform = "translate(-400%, -50%)";
    ContainerBoard.style.transform = "translate(-50%, -300%)";
    ContainerResult.style.transform = "translate(-50%, -50%)";

    ContainerDetails.style.transition = ".3s ease-in-out";
    ContainerBoard.style.transition = ".3s ease-in-out";
    ContainerResult.style.transition = ".3s ease-in-out";

    WinText.textContent = `The Player (${currentTurn}) Wins !!`;
  } else {
    return;
  }
};

const changeTurn = () => {
  if (currentTurn == "X") {
    turnText.innerText = `Turn for (${currentTurn}) !`;
    currentTurn = "O";
  } else {
    turnText.innerText = `Turn for (${currentTurn}) !`;
    currentTurn = "X";
  }

  return currentTurn;
};

const StartGame = () => {
  ContainerDetails.style.transform = "translate(-400%, -50%)";
  ContainerBoard.style.transform = "translate(-50%, -50%)";

  ContainerDetails.style.transition = ".3s ease-in-out";
  ContainerBoard.style.transition = ".3s ease-in-out";
};

startGameBtn.addEventListener("click", () => {
  StartGame();

  changeTurn();
});

Box.forEach((e) =>
  e.addEventListener("click", () => {
    changeTurn();

    e.innerText = currentTurn;
    e.style.pointerEvents = "none";

    if (e.textContent) {
      checkWin();

      checkTie();
    }
  })
);

const restartGame = () => {
  Box.forEach((e) => {
    e.innerText = "";
    e.style.pointerEvents = "all";
  });

  ContainerDetails.style.transform = "translate(-50%, -50%)";
  ContainerBoard.style.transform = "translate(-50%, -300%)";
  ContainerResult.style.transform = "translate(300%, -50%)";

  ContainerResult.transition = ".3s ease-in-out";
  ContainerDetails.style.transition = ".3s ease-in-out";
  ContainerBoard.style.transition = ".3s ease-in-out";

  winner = null;
};

Restart.forEach((e) => e.addEventListener("click", restartGame));
