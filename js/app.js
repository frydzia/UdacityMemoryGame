
// create a list that holds all of cards
let card = document.getElementsByClassName("card");
let cards = [...card];

// declare variables for moves counter
let moves = 0;
let moveCounter = document.querySelector('.moves');

// declare variables for timer
let startTimer = false;
let minute = 0;
let second = 0;
let timer = document.querySelector('.timer');
let time;

// declare variable for stop / unlock the possibility of opening other cards
let busy = false;

// declare variables for congratulations popup
let popUp = document.getElementById('win-board');


// shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

// create new board with shuffled cards when page is refreshed
document.body.onload = newBoard();

// create new board with shuffled cards
function newBoard() {
  // clean board, close cards
  let cardList = document.getElementsByClassName('card');
  for (let i = 0; i < cards.length; i++) {
    cardList[i].classList.remove('open', 'show', 'match');
  };
  // shuffle cards
  shuffle(cards);
  let deckCards = document.getElementsByClassName('deck')[0];
  for (let i = 0; i < cards.length; i++) {
    deckCards.appendChild(cards[i]);
  };

  // reset moves
  moves = 0;
  moveCounter.innerHTML = moves;

  // reset timer
  startTimer = false;
  minute = 0;
  second = 0;
  timer.innerHTML = minute + ' min  ' + second + ' sec';
  clearInterval(time);

  // reset star rating
  let star = document.getElementsByClassName('fa-star');
  star[0].style.color = 'black';
  star[1].style.color = 'black';
  star[2].style.color = 'black';

  // hide congratulatinos popup
  popUp.classList.remove('show');
}

// display the card's symbol when card is clicked
let cardClicked = function() {
  let clicked = this;

  if (!busy) {
    clicked.classList.add('open');
    clicked.classList.add('show');
    cardOpen(); // compare cards
    moveNumber(); // count moves
    starRating(); // issue a star rating
    // measure time
    if (!startTimer) {
      countTime();
      startTimer = true;
    };
    congratulationsPopUp(); // show congratulations if the player won
  };
};

// select open cards
function cardOpen() {
  let opened = document.getElementsByClassName('open');

  // check to see if the two open cards match
  if (opened.length === 2) {
    busy = true; // stop the possibility of opening other cards
    if (opened[0].innerHTML === opened[1].innerHTML) {
      matched();
    } else {
      unmatched();
    };
  };
}

// if the cards do match, lock the cards in the open position
function matched() {
  let openCards = document.getElementsByClassName('open');

  openCards[0].classList.add('match');
  openCards[1].classList.add('match');
  openCards[1].classList.remove('show', 'open');
  openCards[0].classList.remove('show', 'open');
  busy = false; // unlock the possibility to open the remaining cards
}

// if the cards do not match, hide the card's symbol
function unmatched() {
  setTimeout(function() {
    let listOfOpenCards = document.getElementsByClassName('open');

    listOfOpenCards[1].classList.remove('show', 'open');
    listOfOpenCards[0].classList.remove('show', 'open');
    busy = false; // unlock the possibility to open the remaining cards
  }, 600);
}

// move counter
function moveNumber() {
  moves++;
  moveCounter.innerHTML = moves;
}

// star rating
function starRating() {
  let star = document.getElementsByClassName('fa-star');

  if (moves <= 20) {
    star[0].style.color = 'yellow';
    star[1].style.color = 'yellow';
    star[2].style.color = 'yellow';
  } else if (moves > 20 && moves <= 30) {
    star[0].style.color = 'yellow';
    star[1].style.color = 'yellow';
    star[2].style.color = 'black';
  } else if (moves > 30) {
    star[0].style.color = 'yellow';
    star[1].style.color = 'black';
    star[2].style.color = 'black';
  };
}

// game timer
function countTime() {
  second = 1;
  time = setInterval(function() {
    timer.innerHTML = minute + ' min  ' + second + ' sec';
    second++;
    if (second == 60) {
      minute++;
      second = 0;
    };
  }, 1000);
}

// if all cards have matched, display a congratulations with the final score
function congratulationsPopUp() {
  let matchedCars = document.getElementsByClassName('match');

  if (matchedCars.length === 16) { // check if all cards have matched
    clearInterval(time); // stop timer
    let ratingStars = document.querySelector('.stars').innerHTML;
    let finalTime = timer.innerHTML;
    popUp.classList.add('show'); // show popup with results
    document.querySelector('.total-moves').innerHTML = moves;
    document.querySelector('.total-time').innerHTML = finalTime;
    document.querySelector('.total-rating').innerHTML = ratingStars;
  };
}

// restart game
let refresh = document.querySelector('.fa-repeat');
refresh.addEventListener('click', newBoard);

// event listener for a card
for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener('click', cardClicked);
};
