const restartGame = document.querySelector("#resetButton");
// const gameMode = document.querySelector("#modeChange")

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

let points = [0, 0]
let casts = [15, 15]
let fish = [[], []]

let currentPlayer = 0;

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
    "tinySmall": [
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
    },
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
    "smallMedium": [
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
        },
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
    "mediumLarge": [
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
        },
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
    "largeHuge": [
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
        },
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
            name: "Coelacanth",
            points: 850
        },
        {
            name: "Oarfish",
            points: 900
        },
    ],
    "hugeFish": [
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
            name: "Coelacanth",
            points: 850
        },
        {
            name: "Oarfish",
            points: 900
        },
    ]
};


function randomFish(size) {
    const fishedUp = Math.floor(Math.random() * fishes[size].length)
    points[currentPlayer] += fishes[size][fishedUp].points
    fish[currentPlayer].push(fishes[size][fishedUp].name)
};

function castLine(fishSize, difficulty){
    if (casts[currentPlayer] >= 1){
            casts[currentPlayer] -= 1;
           if (points[currentPlayer] >= difficulty) {
            randomFish(fishSize)
           } else {
            randomFish("trashFish")
        }

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
    castLine("tinySmall", 30)
});

levelThree.addEventListener("click", function(){
    castLine("smallFish", 60)
});

levelFour.addEventListener("click", function(){
    castLine("smallMedium", 120)
});

levelFive.addEventListener("click", function(){
    castLine("mediumFish", 300)
});

levelSix.addEventListener("click", function(){
    castLine("mediumLarge", 500)
});

levelSeven.addEventListener("click", function(){
    castLine("largeFish", 800)
});

levelEight.addEventListener("click", function(){
    castLine("largeHuge", 1000)
});

levelNine.addEventListener("click", function(){
    castLine("hugeFish", 1500)
});


/* Initialize + Game Mode */

function initialize() {
    points = [0, 0];
    pOnePointsEl.textContent = 0;
    pTwoPointsEl.textContent = 0;

    casts = [15, 15];
    pOneCastsEl.textContent = 15;
    pTwoCastsEl.textContent = 15;

    fish = [[], []];
    pOneFishBox.textContent = [];
    pTwoFishBox.textContent = [];

    currentPlayer = 0;

    winnerEl.textContent = "";
};

initialize()

restartGame.addEventListener("click", initialize);

// To be added at a later date.

// function difficultySwitch() {
// }

// gameMode.addEventListener("click", difficultySwitch)