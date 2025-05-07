const loginForm = document.getElementById('login-form'); 
const loginContainer = document.getElementById('login-container'); 
const gameContainer = document.getElementById('game-container'); 
const loginError = document.getElementById('login-error'); 
 
const rollBtn = document.getElementById('roll-btn'); 
const holdBtn = document.getElementById('hold-btn'); 
const resetBtn = document.getElementById('reset-btn'); 
const dice1 = document.getElementById('dice1'); 
const dice2 = document.getElementById('dice2'); 
const player1ScoreEl = document.getElementById('player1-score'); 
const player2ScoreEl = document.getElementById('player2-score'); 
const messageEl = document.getElementById('message'); 
 
const winnerModal = document.getElementById('winner-modal'); 
const winnerMessage = document.getElementById('winner-message'); 
const closeBtn = document.querySelector('.close-btn'); 
const playAgainBtn = document.getElementById('play-again-btn'); 
 
let player1Score = 0; 
let player2Score = 0; 
let currentPlayer = 1;  
let currentRoundScore = 0; 
let gameActive = true; 
 
loginForm.addEventListener('submit', function(event) { 
    event.preventDefault(); 
 
    
    const username = document.getElementById('username').value; 
 
     
    if (username.trim() === "") { 
 
        loginError.textContent = 'Please enter a valid username!'; 
    } else { 
        loginError.textContent = '';   
        loginContainer.style.display = 'none';   
        gameContainer.style.display = 'block';   
    } 
}); 
 
function rollDice() { 
    if (!gameActive) return; 
 
     
    dice1.classList.add('dice-roll'); 
    dice2.classList.add('dice-roll'); 
 
    setTimeout(() => { 
        dice1.classList.remove('dice-roll'); 
        dice2.classList.remove('dice-roll'); 
    }, 600); 
 
     
    const dice1Roll = Math.floor(Math.random() * 6) + 1; 
    const dice2Roll = Math.floor(Math.random() * 6) + 1; 
 
  
    setTimeout(() => { 
        dice1.textContent = getDiceIcon(dice1Roll); 
        dice2.textContent = getDiceIcon(dice2Roll); 
 
         
        if (dice1Roll === 1 && dice2Roll === 1) { 
            resetCurrentPlayerScore(); 
            switchPlayer(); 
        } else { 
            currentRoundScore += dice1Roll + dice2Roll; 
 
        } 
    }, 600); 
} 
 
function holdScore() { 
    if (!gameActive) return; 
 
    if (currentPlayer === 1) { 
        player1Score += currentRoundScore; 
        player1ScoreEl.textContent = player1Score; 
    } else { 
        player2Score += currentRoundScore; 
        player2ScoreEl.textContent = player2Score; 
    } 
 
    checkWinner(); 
    switchPlayer(); 
} 
 
function resetGame() { 
    player1Score = 0; 
    player2Score = 0; 
    currentRoundScore = 0; 
    currentPlayer = 1; 
    gameActive = true; 
    player1ScoreEl.textContent = '0'; 
    player2ScoreEl.textContent = '0'; 
    dice1.textContent = '       '; 
    dice2.textContent = '       '; 
    messageEl.textContent = ''; 
} 
 
function getDiceIcon(diceValue) { 
    switch (diceValue) { 
        case 1: return '⚀'; 
  
        case 2: return '⚁'; 
        case 3: return '⚂'; 
        case 4: return '⚃'; 
        case 5: return '⚄'; 
        case 6: return '⚅'; 
        default: return '       '; 
    } 
} 
 
function switchPlayer() { 
    currentRoundScore = 0; 
    currentPlayer = currentPlayer === 1 ? 2 : 1; 
    messageEl.textContent = `Player ${currentPlayer}'s turn!`; 
} 
 
function checkWinner() { 
    if (player1Score >= 30) { 
        showWinnerModal('Player 1'); 
        gameActive = false; 
    } else if (player2Score >= 0) { 
        showWinnerModal('Player 2'); 
        gameActive = false; 
    } 
} 
 
function showWinnerModal(winner) { 
    winnerMessage.textContent = `       ${winner} Wins!       `; 
    winnerModal.style.display = 'flex';  
} 
 
closeBtn.addEventListener('click', () => { 
    winnerModal.style.display = 'none'; 
    resetGame(); 
}); 

playAgainBtn.addEventListener('click', () => { 
    winnerModal.style.display = 'none'; 
    resetGame(); 
}); 
 
rollBtn.addEventListener('click', rollDice); 
holdBtn.addEventListener('click', holdScore); 
resetBtn.addEventListener('click', resetGame);