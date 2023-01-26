const gameContainer = document.getElementById("game");
let stop = false;
let firstCard = null;
let secondCard = null;
let cardsClicked = 0;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length; //10

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index]; //arrayColorbackwards = randomColor
    array[index] = temp; //randomColor = arrayColorBackwards
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(e) {
  if (stop) return;
  if (e.target.classList.contains("activated")) return;

  //Clicking adds color based on class
  const clickedCard = e.target;
  clickedCard.style.backgroundColor = e.target.getAttribute("class");

  //Assigning first car and second card clicked on
  if (!firstCard || !secondCard) {
    firstCard = firstCard || clickedCard;
    clickedCard.classList.add("activated");
    secondCard = firstCard === clickedCard ? null : clickedCard;
    console.log(firstCard, secondCard);
  }

  if (firstCard && secondCard) {
    stop = true;
    if (firstCard.className === secondCard.className) {
      cardsClicked += 2;
      firstCard.removeEventListener("click", handleCardClick);
      secondCard.removeEventListener("click", handleCardClick);
      firstCard = null;
      secondCard = null;
      stop = false;
    } else {
      setTimeout(function () {
        firstCard.style.backgroundColor = "";
        secondCard.style.backgroundColor = "";
        firstCard.classList.remove("activated");
        secondCard.classList.remove("activated");
        firstCard = null;
        secondCard = null;
        stop = false;
      }, 1000);
    }
  }
  if (cardsClicked === COLORS.length) alert("GAME OVER!");
}
// When the DOM loads
createDivsForColors(shuffledColors);
