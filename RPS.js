let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  tie: 0
};

updateScoreElem();

let autoPlaying = false;
let intervalId;

function autoPlay() {
  if (!autoPlaying) {
    intervalId = setInterval( () => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    autoPlaying = true;
  } else {
    clearInterval(intervalId);
    autoPlaying = false;
  }
}

document.querySelector('.js-rock-btn')
 .addEventListener('click', () => {
  playGame('rock');
 });

document.querySelector('.js-paper-btn')
 .addEventListener('click', () => {
  playGame('paper');
 });

document.querySelector('.js-scissor-btn')
 .addEventListener('click', () => {
  playGame('scissor');
 });

function playGame(playerMove) {
  const computerMove = pickComputerMove();

    let gameResult = '';

    if (playerMove === 'scissor') {
      if (computerMove === 'rock') {
        gameResult = 'You lose';
      } else if (computerMove === 'scissor') {
        gameResult = 'Tie';
      } else if (computerMove === 'paper') {
        gameResult = 'You win';
      }

  } else if (playerMove === 'paper') {
      if (computerMove === 'rock') {
        gameResult = 'You win';
      } else if (computerMove === 'scissor') {
        gameResult = 'You lose';
      } else if (computerMove === 'paper') {
        gameResult = 'Tie';
      }

  } else if (playerMove === 'rock') {
      if (computerMove === 'rock') {
        gameResult = 'Tie';
      } else if (computerMove === 'scissor') {
        gameResult = 'You win';
      } else if (computerMove === 'paper') {
        gameResult = 'You lose';
      }
  }

    if (gameResult === 'You win') {
      score.wins += 1;
    } else if (gameResult === 'You lose') {
      score.losses += 1;
    } else if (gameResult === 'Tie') {
      score.tie += 1;
    }

    updateScoreElem();

    document.querySelector('.js-results')
     .innerHTML = gameResult;

    document.querySelector('.js-moves')
     .innerHTML = `You picked ${playerMove}. Computer picked ${computerMove}`;

    localStorage.setItem('score', JSON.stringify(score));

}

function updateScoreElem() {
  document.querySelector('.js-scores')
   .innerHTML = `Wins: ${score.wins}, Losses ${score.losses}, Tie ${score.tie}`;
}

function pickComputerMove() {
  const randomMove = Math.random();

  let computerMove = '';

    if (randomMove >= 0 && randomMove < 1 / 3) {
      computerMove = 'rock';
    } else if (randomMove >= 1 / 3 && randomMove < 2 / 3) {
      computerMove = 'paper';
    } else if ( randomMove >= 2 / 3 && randomMove < 1) {
      computerMove = 'scissor';
  }

  return computerMove;
}