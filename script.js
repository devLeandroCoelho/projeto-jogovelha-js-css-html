document.addEventListener("DOMContentLoaded", function () {
  const board = document.getElementById("game-board");
  const status = document.getElementById("status");
  const restartBtn = document.getElementById("restart-btn");
  const playerXScore = document.getElementById("score-x");
  const playerOScore = document.getElementById("score-o");
  const resetScoreBtn = document.getElementById("reset-score-btn");

  let currentPlayer = "X";
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  let gameActive = true;
  let scores = { X: 0, O: 0 };

  function checkWinner() {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        gameBoard[a] &&
        gameBoard[a] === gameBoard[b] &&
        gameBoard[a] === gameBoard[c]
      ) {
        return gameBoard[a];
      }
    }

    if (!gameBoard.includes("")) {
      return "T"; // Tie
    }

    return null;
  }

  function handleCellClick(index) {
    if (!gameActive || gameBoard[index] !== "") {
      return;
    }

    gameBoard[index] = currentPlayer;
    renderBoard();

    const winner = checkWinner();
    if (winner) {
      gameActive = false;
      if (winner === "T") {
        status.textContent = "Empate!";
      } else {
        status.textContent = `Jogador ${winner} venceu!`;
        scores[winner]++;
        updateScores();
      }
      restartBtn.style.display = "inline-block"; // Mostra o botão de reinício
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      status.textContent = `Vez do Jogador ${currentPlayer}`;
    }
  }

  function restartGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    renderBoard();
    status.textContent = `Vez do Jogador X`;
    restartBtn.style.display = "none"; // Esconde o botão de reinício
  }

  function resetScore() {
    scores = { X: 0, O: 0 };
    restartGame();
    updateScores();
  }

  function updateScores() {
    playerXScore.textContent = scores["X"];
    playerOScore.textContent = scores["O"];
  }

  function renderBoard() {
    board.innerHTML = "";
    gameBoard.forEach((value, index) => {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.textContent = value;
      cell.addEventListener("click", () => handleCellClick(index));
      board.appendChild(cell);
    });
    updateScores();
  }

  renderBoard();

  // Associar a função restartGame ao evento de clique no botão
  restartBtn.addEventListener("click", restartGame);

  // Associar a função resetScore ao evento de clique no botão de zerar placar
  resetScoreBtn.addEventListener("click", resetScore);
});