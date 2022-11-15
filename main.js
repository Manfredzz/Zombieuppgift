const numOfHouses = 100;
const numOfRounds = 10;
const houses = [];
const resultArr = [];
let rounds = 0;
let turn = 0;
const results = document.querySelector('#gameResults');
const container = document.querySelector('#container');
const zombieDiv = document.querySelector('#zombie');
const currentRound = document.querySelector('#currentRound');

let isPlaying = false;

const init = () => {
    for (let i = 0; i < numOfHouses; i++) {
        houses.push(false);
        let house = document.createElement('div');
        house.classList.add('house');
        house.setAttribute('id', `house${i}`);
        container.appendChild(house);
    }
    let zombie = document.createElement('div');
    zombie.classList.add('infected');
    zombie.classList.add('zombie');
    zombieDiv.appendChild(zombie);
};

const delay = (delayInms) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('');
        }, delayInms);
    });
};

const someAlive = () => {
    return houses.some((house) => house == false);
};

const resetResults = () => {
    if (isPlaying) return;
    turn = 0;
    resultArr.length = 0;
    results.innerHTML = '';
};

const resetGame = () => {
    for (let i = 0; i < numOfHouses; i++) {
        houses[i] = false;
        document.querySelector(`#house${i}`).classList.remove('infected');
    }
    rounds = 0;
    currentRound.innerHTML = `Runda: 0`;
};

const infect = (house) => {
    houses[house] = true;
    document.querySelector(`#house${house}`).classList.add('infected');
};

const newRound = async () => {
    let numOfZombies = houses.reduce((n, val) => {
        return n + val;
    }, 1);
    console.log(numOfZombies);
    for (let i = 0; i < numOfZombies; i++) {
        const randomHouse = Math.floor(Math.random() * numOfHouses);
        if (houses[randomHouse] != true) {
            infect(randomHouse);
            await delay(0);
        }
    }
    rounds++;
    currentRound.innerHTML = `Runda: ${rounds}`;
};

const averageRounds = (arrToReduce) => {
    const total = arrToReduce.reduce((acc, curr) => {
        return acc + curr;
    }, 0);
    let unRounded = total / turn;
    let rounded = Math.round(unRounded * 100) / 100;
    return rounded;
};

const startGame = async () => {
    if (!isPlaying) {
        isPlaying = true;
        while (someAlive()) {
            await newRound();
            await delay(50);
        }
        isPlaying = false;
        turn++;
        resultArr.push(rounds);
        results.innerHTML += `
        <li>
        Infektionen spred sig på ${rounds} rundor. Snittet är ${averageRounds(resultArr)}
        på ${turn} omgångar.  
        </li>
        `;
        resetGame();
        return new Promise((res) => {
            res('');
        });
    } else return;
};

const tenGames = async () => {
    for (let i = 0; i < numOfRounds; i++) {
        await startGame();
    }
};

init();
document.querySelector('#playButton').addEventListener("click", startGame);
document.querySelector('#tenGamesButton').addEventListener("click", tenGames);