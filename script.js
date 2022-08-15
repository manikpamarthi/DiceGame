'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let activePlayer, currentScore, playing;

function reset() {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  activePlayer = 0;
  currentScore = 0;
  playing = true;
  diceEl.classList.add('hidden');
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
}

function switchPlayer() {
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.querySelector(`.player--1`).classList.toggle('player--active');
  document.querySelector(`.player--0`).classList.toggle('player--active');
}

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      currentScore = 0;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    const playerScore = document.querySelector(`#score--${activePlayer}`);
    let tempScore = Number(playerScore.textContent);
    tempScore += currentScore;
    playerScore.textContent = tempScore;
    currentScore = 0;
    const currentPlayer = document.querySelector(`#current--${activePlayer}`);
    currentPlayer.textContent = currentScore;
    if (tempScore >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    }
    switchPlayer();
  }
});

reset();
btnNew.addEventListener('click', reset);
