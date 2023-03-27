const gameBoard = document.getElementById('game-board');
const scoreValue = document.getElementById('score-value');
const timeValue = document.getElementById('time-value');

const rows = 8;
const columns = 8;
const colors = ['red', 'blue', 'green', 'yellow', 'orange'];

let score = 0;
let time = 60;

function initGame() {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.dataset.color = colors[Math.floor(Math.random() * colors.length)];
      cell.style.backgroundColor = cell.dataset.color;
      gameBoard.appendChild(cell);
    }
  }
}

function updateScore(amount) {
  score += amount;
  scoreValue.textContent = score;
}

function updateTime() {
  time--;
  timeValue.textContent = time;

  if (time === 0) {
    // Game over
  }
}

function checkForMatches() {
  const cells = document.querySelectorAll('.cell');
  const cellsToRemove = [];
  let scoreIncrement = 0;

  // kolla horizontell led
  for (let row = 0; row < rows; row++) {
    let matchingColor = null;
    let matchLength = 0;

    for (let col = 0; col < columns; col++) {
      const cell = cells[row * columns + col];

      if (cell.dataset.color === matchingColor) {
        matchLength++;
      } else {
        if (matchLength >= 3) {
          for (let i = 0; i < matchLength; i++) {
            cellsToRemove.push(cells[row * columns + col - i - 1]);
          }
          scoreIncrement += matchLength;
        }

        matchingColor = cell.dataset.color;
        matchLength = 1;
      }
    }

    if (matchLength >= 3) {
      for (let i = 0; i < matchLength; i++) {
        cellsToRemove.push(cells[row * columns + columns - i - 1]);
      }
      scoreIncrement += matchLength;
    }
  }

  // kolla vertikal led
  for (let col = 0; col < columns; col++) {
    let matchingColor = null;
    let matchLength = 0;

    for (let row = 0; row < rows; row++) {
      const cell = cells[row * columns + col];

      if (cell.dataset.color === matchingColor) {
        matchLength++;
      } else {
        if (matchLength >= 3) {
          for (let i = 0; i < matchLength; i++) {
            cellsToRemove.push(cells[(row - i - 1) * columns + col]);
          }
          scoreIncrement += matchLength;
        }

        matchingColor = cell.dataset.color;
        matchLength = 1;
      }
    }

    if (matchLength >= 3) {
      for (let i = 0; i < matchLength; i++) {
        cellsToRemove.push(cells[(rows - i - 1) * columns + col]);
      }
      scoreIncrement += matchLength;
    }
  }

  // ta bort "cells"
  if (cellsToRemove.length > 0) {
    cellsToRemove.forEach(cell => {
      cell.style.backgroundColor = '';
      cell.dataset.color = '';
    });

    updateScore(scoreIncrement);
  }
}

function swapCells(cell1, cell2) {
  const row1 = parseInt(cell1.dataset.row);
  const col1 = parseInt(cell1.dataset.col);
  const color1 = cell1.dataset.color;

  const row2 = parseInt(cell2.dataset.row);
  const col2 = parseInt(cell2.dataset.col);
  const color2 = cell2.dataset.color;

  cell1.style.transition = 'background-color 0.3s ease';
  cell2.style.transition = 'background-color 0.3s ease';

  // Swap "colors"
  cell1.style.backgroundColor = color2;
  cell2.style.backgroundColor = color1;

  // Updatera dataset
  cell1.dataset.row = row2;
  cell1.dataset.col = col2;
  cell1.dataset.color = color2;

  cell2.dataset.row = row1;
  cell2.dataset.col = col1;
  cell2.dataset.color = color1;

  // kolla för "match" efter animationen är slut
  setTimeout(() => {
    checkForMatches();
  }, 300);
}

function handleCellClick(event) {
  const clickedCell = event.target;

  if (!handleCellClick.firstCellClicked) {
    clickedCell.classList.add('selected');
    handleCellClick.firstCellClicked = clickedCell;
  } else if (clickedCell !== handleCellClick.firstCellClicked) {
    clickedCell.classList.add('selected');
    const secondCellClicked = clickedCell;

    // byt plats på  "cells"
    swapCells(handleCellClick.firstCellClicked, secondCellClicked);

    // ta bort "select" på "cells"
    handleCellClick.firstCellClicked.classList.remove('selected');
    secondCellClicked.classList.remove('selected');

    handleCellClick.firstCellClicked = null;
  }
}

initGame();

setInterval(updateTime, 1000);

gameBoard.addEventListener('click', handleCellClick);