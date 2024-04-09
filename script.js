const classO = 'O';
const classX = 'X';
const winningCombinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

const board = document.querySelector('.board');
const boardCells = document.querySelectorAll('.cell');
const whoWin = document.querySelector('.who-win');
const winningText = document.querySelector('.winning-text');
const restartButton = document.querySelector('.restart');
const moveOfPlayer = document.querySelector('.move-of-player');
let isOTurn = false; //game will start with X's turn
let count = 0;

function addRemoveEventListernerFun(boardCells, remove) {
    boardCells.forEach(cell => {
        if(remove) cell.removeEventListener('click', handleCellClick);
        else cell.addEventListener('click', handleCellClick, {once: true});
    });
}

function endGame(draw) {
    if(draw) winningText.innerText = "It's a draw!";
    else winningText.innerText = `Player with ${isOTurn ? "O's" : "X's"} wins!`;
    whoWin.style.visibility = "visible";
    addRemoveEventListernerFun(boardCells, true); // true: means remove the eventlisteners from each cell
}

function markPlace(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.innerText = currentClass;
    moveOfPlayer.style.display = "flex";
    const move = document.createElement('p');
    if(currentClass === 'O') move.innerText = `Player O moved, Now turn for Player X.`;
    else move.innerText = `Player X moved, Now turn for Player O.`;
    moveOfPlayer.append(move);
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => boardCells[index].classList.contains(currentClass));
    });
}

function handleCellClick(e) {
    count++;
    const cell = e.target;
    const currentClass = isOTurn ? classO : classX;
    markPlace(cell, currentClass);
    if(checkWin(currentClass)) endGame(false);
    else if(count === 9) endGame(true); //all cell filled, then end (draw) the game
    else isOTurn = !isOTurn;
}

function startGame() {
    isOTurn = false;
    count = 0;
    boardCells.forEach(cell => {
        cell.classList.remove(classO);
        cell.classList.remove(classX);
        cell.innerText = "";
    });
    addRemoveEventListernerFun(boardCells, true);
    addRemoveEventListernerFun(boardCells, false); //set eventlistener at each cell for once.
    moveOfPlayer.innerHTML = "";
    moveOfPlayer.style.display = "none";
    whoWin.style.visibility = "hidden";
}
startGame(); //for first time
restartButton.addEventListener('click', startGame);

