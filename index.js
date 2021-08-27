const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const setsBtn = document.getElementById('settings-btn');
const sets = document.getElementById('settings');
const setsForm = document.getElementById('settings-form');
const difSelect = document.getElementById('difficulty');

const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving'
];

// Initialize word score and timt
let randomWord;
let score = 0;
let time = 10;

//set difficulty to value in ls 
let difficulty = 
    localStorage.getItem('difficulty') !== null
        ? localStorage.getItem('difficulty') 
        : 'medium';

//set difficulty select value
difSelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

//Focus ontext on start
text.focus();

//Start counting down
const timeInterval = setInterval(updateTime, 1000);

//Functions
//Generate random word from array
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}



//Add word to DOM
function addWord2DOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;   
}

//Update Score
function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}

function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';

    if (time === 0) {
        clearInterval(timeInterval);
        
        //end game
        gameOver();
    } 
}

//Game over 
function gameOver() {
    endgameEl.innerHTML = `
        <h1> Time Ran Out</h1>
        <p>Your final score is ${score}</p>
        <button onclick="location.reload()">New Game</button>
    `;


    endgameEl.style.display = 'flex';
}

addWord2DOM();

//Event Listeners
text.addEventListener('input', e => {
    const insertedText = e.target.value;

    if(insertedText === randomWord) {
        addWord2DOM();
        updateScore();

        //clear input
        e.target.value = '';

        if (difficulty === 'hard') {
            time += 2;
        } else if (difficulty === 'medium') {
            time += 3;
        } else {
            time += 5;
        }

        updateTime();
    }
});

//settings difficulty
setsBtn.addEventListener('click', () => sets.classList.toggle('hide'));

//Setting select
setsForm.addEventListener('change', e => { 
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
});

//var xhr = new XMLHttpRequest();
//Beware of cross orgin policy
//xhr.open("GET", "http://randomword.setgetgo.com/get.php", false);
//xhr.send();
 
//alert(xhr.responseText);