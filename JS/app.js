// Things I will be using to make the game:
//   1. Arrays
//   2. Queryselectors
//   3. Event Handlers
//   4. Math.random()
//   6. CSS/Grid and/or Flexbox


// What I want the game to do:
//  1. I want the game to exist in a grid of 3x3, where the different blocks have different arrays and 'difficulty' starting with the easiest being the top left and the hardest being the bottom right.
//  2. I would like the game to recognize which block the player clicks in and to recognize which array corresponds to each box.
//  3. I would also like it to keep track of caught fish, amount of points, and casts remaining. It would be nice to be able to display the fish caught, but only the points accumulated and casts remaining are necessary. 
    // 3b. I would also like to have a high score table so you can play against yourself (or another player) on the same screen.
//  4. I need a reset button.
//  5. If I have a display of the fish caught, I need to decide if it's going to be always on or only after you get to the results page.

// Things I need to do:
// 1. Initialize the game
//  Empty/clear the caught arrays
    //Empty/clear the score totals
    //Refill the remaining casts
    //[future] Print the scores to the high score list
// 2. Start at Player one
//  fish in the appropriate array
    // subtract from the remaining casts
    // display fish caught + its point value
    // add new points to total points
    // [future] display fish caught in list
// 3. Switch to player two after player two makes a move.
    // Repeat steps from player two but for player two.
// 5. Switch to player one after player two makes a move.
// 6. End the game when both players are out of casts.

/* Constants */
const restartGame = document.querySelector("#resetButton");

const levelOne = document.querySelector("#poolOne");
const levelTwo = document.querySelector("#poolTwo");
const levelThree = document.querySelector("#poolThree");
const levelFour = document.querySelector("#poolFour");
const levelFive = document.querySelector("#poolFive");
const levelSix = document.querySelector("#poolSix");
const levelSeven = document.querySelector("#poolSeven");
const levelEight = document.querySelector("#poolEight");
const levelNine = document.querySelector("#poolNine");

const pOnePointsEl = document.querySelector("#pointTotalOne");
const pOneFishBox = document.querySelector("#fishBoxOne");
const pOneCastsEl = document.querySelector("#castsLeftOne");

const pTwoPointsEl = document.querySelector("#pointTotalTwo");
const pTwoFishBox = document.querySelector("#fishBoxTwo");
const pTwoCastsEl = document.querySelector("#castsLeftTwo");
const winnerEl = document.querySelector(".winner")

/* Variables */
// let pOnePoints = 0;
// let pTwoPoints = 0;
// let pOneCasts = 0;
// let pTwoCasts = 0; 
// let pOneFish = [];
// let pTwoFish = [];

let points = [0, 0]
let casts = [10, 10]
let fish = [[], []]

let currentPlayer = 0;

/* Arrays */

const fishes = {
    "trashFish":[
        {
            name: "Six-pack Rings",
            points: 0
        },
        {
            name: "Plastic Jug",
            points: 0
        },
        {
            name: "Tangled Net",
            points: 0
        },
        {
            name: "Old Tire",
            points: 0
        },
        {
            name: "Sponge",
            points: 0
        }
    ],
    "tinyFish": [
        {
            name: "Cherubfish",
            points: 10
        },
        {
            name: "Clam",
            points: 13
        },
        {
            name: "Fairy Basslet",
            points: 15
        },
        {
            name: "Pinkeye Goby",
            points: 18
        },
        {
            name: "Anchovy",
            points: 20
        }
    ],
    "smallFish": [
        {
            name: "Hairy Squat Lobster",
            points: 40
        },
        {
            name: "Frogfish",
            points: 43
        },
        {
            name: "Yellowhead Jawfish",
            points: 45
        },
        {
            name: "Decorator Crab",
            points: 48
        },
        {
            name: "Clownfish",
            points: 50
        }
    ],
    "mediumFish": [
        {
            name: "Suckerfish",
            points: 100
        },
        {
            name: "Dace",
            points: 130
        },
        {
            name: "Dab",
            points: 150
        },
        {
            name: "Puffer Fish",
            points: 180
        },
        {
            name: "Squid",
            points: 200
        }
    ],
    "largeFish": [
        {
            name: "Red Snapper",
            points: 300
        },
        {
            name: "Salmon",
            points: 330
        },
        {
            name: "Wobbegong",
            points: 350
        },
        {
            name: "Salmon",
            points: 380
        },
        {
            name: "Catfish",
            points: 400
        }
    ],
    "extraLargeFish": [
        {
            name: "Tuna",
            points: 500
        },
        {
            name: "Blue Marlin",
            points: 550
        },
        {
            name: "Ocean Sunfish",
            points: 600
        },
        {
            name: "Napoleonfish",
            points: 650
        },
        {
            name: "Football Fish",
            points: 700
        }
    ],
    "hugeFish": [
        {
            name: "Great White Shark",
            points: 800
        },
        {
            name: "Coelacanth",
            points: 850
        },
        {
            name: "Oarfish",
            points: 900
        },
        {
            name: "Kraken",
            points: 950
        },
        {
            name: "Leviathan",
            points: 1000
        }
    ]
};

/* Event Handlers + Functions */
restartGame.addEventListener("click", initialize);

function randomFish(size) {
    const fishedUp = Math.floor(Math.random() * fishes[size].length)
    points[currentPlayer] += fishes[size][fishedUp].points
    fish[currentPlayer].push(fishes[size][fishedUp].name)
};

function castLine(fishSize, difficulty){
    // Check casts remaining
    if (casts[currentPlayer] >= 1){
        // Remove cast
            casts[currentPlayer] -= 1;
        // Check if they have enough points to fish successfully + fish from appropriate array
           if (points[currentPlayer] >= difficulty) {
            randomFish(fishSize)
           } else {
            randomFish("trashFish")
        }
        // Add text content and switch players
        if (currentPlayer == 0) {
        pOneCastsEl.textContent = casts[currentPlayer]
        pOneFishBox.textContent = fish[currentPlayer].join(", ")
        pOnePointsEl.textContent = points[currentPlayer]
        currentPlayer = 1
        } else {
            pTwoCastsEl.textContent = casts[currentPlayer]
            pTwoFishBox.textContent = fish[currentPlayer].join(", ")
            pTwoPointsEl.textContent = points[currentPlayer]
            currentPlayer = 0
        }
    }
    if (casts[0] == casts[1] && casts[1] == 0) {
        // we have a winner!
        if (points[0] > points[1]){
        winnerEl.textContent = "The winner is Player One!"
        } else {
        winnerEl.textContent = "The winner is Player Two!"
        }
    }
};

levelOne.addEventListener("click", function(){
    castLine("tinyFish", 0) 
});

levelTwo.addEventListener("click", function(){
    castLine("smallFish", 30)
});

levelThree.addEventListener("click", function(){
    castLine("smallFish", 30)
});

levelFour.addEventListener("click", function(){
    castLine("mediumFish", 90)
});

levelFive.addEventListener("click", function(){
    castLine("mediumFish", 90)
});

levelSix.addEventListener("click", function(){
    castLine("mediumFish", 90)
});

levelSeven.addEventListener("click", function(){
    castLine("largeFish", 200)
});

levelEight.addEventListener("click", function(){
    castLine("extraLargeFish", 200)
});

levelNine.addEventListener("click", function(){
    castLine("hugeFish", 500)
});


/* Initialize */

function initialize() {
    // Reset player Points
    points = [0, 0];
    pOnePointsEl.textContent = 0;
    pTwoPointsEl.textContent = 0;

    // Reset player casts
    casts = [10, 10];
    pOneCastsEl.textContent = 10;
    pTwoCastsEl.textContent = 10;

    // Reset fish lists
    fish = [[], []];
    pOneFishBox.textContent = [];
    pTwoFishBox.textContent = [];

    // Set currentPlayer to Player One
    currentPlayer = 0;

    // Reset winner message
    winnerEl.textContent = "";
};

// function randomTiny() {
//     const fishedUp = Math.floor(Math.random() * tinyFish.length)
//     points[currentPlayer] += tinyFish[fishedUp].points
//     fish[currentPlayer].push(tinyFish[fishedUp].name)
//};

initialize()