

let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();


let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;

  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

document.querySelector('.rock-bttn')
  .addEventListener('click', () => {
    playGame('rock-bttn');
  });

document.querySelector('.paper-bttn')
  .addEventListener('click', () => {
    playGame('paper-bttn');
  });

document.querySelector('.scissors-bttn')
  .addEventListener('click', () => {
    playGame('scissors-bttn');
  });

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock-bttn');
  } else if (event.key === 'p') {
    playGame('paper-bttn');
  } else if (event.key === 's') {
    playGame('scissors-bttn');
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'scissors-bttn') {
    if (computerMove === 'rock-bttn') {
      result = 'You lose.';
    } else if (computerMove === 'paper-bttn') {
      result = 'You win.';
    } else if (computerMove === 'scissors-bttn') {
      result = 'Tie.';
    }

  } else if (playerMove === 'paper-bttn') {
    if (computerMove === 'rock-bttn') {
      result = 'You win.';
    } else if (computerMove === 'paper-bttn') {
      result = 'Tie.';
    } else if (computerMove === 'scissors-bttn') {
      result = 'You lose.';
    }
    
  } else if (playerMove === 'rock-bttn') {
    if (computerMove === 'rock-bttn') {
      result = 'Tie.';
    } else if (computerMove === 'paper-bttn') {
      result = 'You lose.';
    } else if (computerMove === 'scissors-bttn') {
      result = 'You win.';
    }
  }

  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.result').innerHTML = result;

  document.querySelector('.moves').innerHTML = `
  <div>
     <label style="padding-right:15px;"> You: <label>
<img style="width:120px; height:120px;" src="image/user-icon.png" class="game-img">
<label style="padding-left:100px; padding-right:15px;"> Computer: <label>
<img style="width:100px; height:100px;" 
src="image/computer-icon.png" class="game-img">
    <div>
 
 `;
}

function updateScoreElement() {
  document.querySelector('.score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock-bttn';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper-bttn';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors-bttn';
  }

  return computerMove;
}
