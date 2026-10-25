const WINNING_SCORE = 5;

const MOVES = {
  rock: { icon: "✊" },
  paper: { icon: "✋" },
  scissors: { icon: "✌️" },
};

const BEATS = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

const scores = { player: 0, computer: 0 };
let gameOver = false;

const playerScoreEl = document.querySelector("#player-score");
const computerScoreEl = document.querySelector("#computer-score");
const playerHandEl = document.querySelector("#player-hand");
const computerHandEl = document.querySelector("#computer-hand");
const messageEl = document.querySelector("#message");
const choiceButtons = document.querySelectorAll(".choice");
const restartButton = document.querySelector("#restart");

const getComputerChoice = () => {
  const moves = Object.keys(MOVES);
  return moves[Math.floor(Math.random() * moves.length)];
};

const getRoundWinner = (player, computer) => {
  if (player === computer) return "draw";
  return BEATS[player] === computer ? "player" : "computer";
};

const setMessage = (text, type = "") => {
  messageEl.textContent = text;
  messageEl.className = `message ${type ? `message--${type}` : ""}`;
};

const showHand = (element, move) => {
  element.textContent = MOVES[move].icon;
  element.classList.remove("pop");
  void element.offsetWidth; // restart the animation
  element.classList.add("pop");
};

const updateScores = () => {
  playerScoreEl.textContent = scores.player;
  computerScoreEl.textContent = scores.computer;
};

const setButtonsDisabled = (disabled) => {
  choiceButtons.forEach((button) => (button.disabled = disabled));
};

const endGame = () => {
  gameOver = true;
  setButtonsDisabled(true);
  restartButton.hidden = false;
  restartButton.focus();

  if (scores.player === WINNING_SCORE) {
    setMessage("You won the game! 🏆", "win");
  } else {
    setMessage("Computer won the game. 💻", "lose");
  }
};

const playRound = (playerChoice) => {
  if (gameOver) return;

  const computerChoice = getComputerChoice();
  const winner = getRoundWinner(playerChoice, computerChoice);

  showHand(playerHandEl, playerChoice);
  showHand(computerHandEl, computerChoice);

  if (winner === "draw") {
    setMessage("It's a tie.");
  } else {
    scores[winner]++;
    setMessage(
      winner === "player" ? "You win this round!" : "You lose this round.",
      winner === "player" ? "win" : "lose",
    );
  }

  updateScores();

  if (scores.player === WINNING_SCORE || scores.computer === WINNING_SCORE) {
    endGame();
  }
};

const resetGame = () => {
  scores.player = 0;
  scores.computer = 0;
  gameOver = false;

  updateScores();
  playerHandEl.textContent = "❔";
  computerHandEl.textContent = "❔";
  setMessage("Pick a move to start.");
  setButtonsDisabled(false);
  restartButton.hidden = true;
  choiceButtons[0].focus();
};

choiceButtons.forEach((button) => {
  button.addEventListener("click", () => playRound(button.dataset.choice));
});
restartButton.addEventListener("click", resetGame);
