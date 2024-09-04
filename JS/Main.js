'use strict'
const MINE = '💣'
const EXPLOADED_MINE = '💥'
var gBoard
var gLevel = { SIZE: 4, MINES: 2 }
var gGame = { isOn: true, shownCount: 0, markedCount: 0, secsPassed: 0 }

function onInit() {
    gBoard = buildBoard()
    setMinesNegsCount(gBoard)
    renderBoard(gBoard)
}

function buildBoard() {
    var board = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = [];
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
                
            };

           
        }
    }

    var totalCells = gLevel.SIZE * gLevel.SIZE
    var minesPlaced = 0
    
    while (minesPlaced < gLevel.MINES) {
       
        var randIdx = Math.floor(Math.random() * totalCells)
        var row = Math.floor(randIdx / gLevel.SIZE)
        var col = randIdx % gLevel.SIZE

        if (!board[row][col].isMine) {
            board[row][col].isMine = true
            minesPlaced++
        }
    }



 
    return board;
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            board[i][j].minesAroundCount = countMinesAround(board, i, j)
        }
    }
}

function countMinesAround(board, rowIdx, colIdx) {
    var minesCount = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= board[i].length) continue;
            if (i === rowIdx && j === colIdx) continue;
            if (board[i][j].isMine) minesCount++;
        }
    }
    return minesCount;
}

function renderBoard(board) {
    var strHTML = '<table><tbody>'
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[i].length; j++) {
            var cell = board[i][j]
            var className = cell.isMine ? 'mine hidden' : 'hidden'
            strHTML += `<td class="${className}" onclick="onCellClicked(this, ${i}, ${j})">${cell.isMine ? MINE : cell.minesAroundCount}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}

function onCellClicked(elCell, i, j) {
    if (!gGame.isOn) return
    var cell = gBoard[i][j]

    if (cell.isShown || cell.isMarked) return
    cell.isShown = true;

    if (cell.isMine) {
        elCell.innerText = EXPLOADED_MINE
        elCell.classList.remove('hidden')

        gameover()




    } else {
        elCell.innerText = cell.minesAroundCount
        elCell.classList.remove('hidden')
    }


}


function gameover() {

    gGame.isOn = false;

  


    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var cell = gBoard[i][j];
            var elCell = document.querySelector(`.board tr:nth-child(${i + 1}) td:nth-child(${j + 1})`);


            elCell.innerText = cell.isMine ? EXPLOADED_MINE : cell.minesAroundCount;
            
            elCell.classList.remove('hidden');
        } 
    }
   

    var popWindow = document.querySelector('.looser-window')
    popWindow.style.display = 'block'


}

function restartGame(){
    gGame.isOn=true
    gBoard = buildBoard()
    setMinesNegsCount(gBoard)
    renderBoard(gBoard)
     var popWindow = document.querySelector('.looser-window')
    popWindow.style.display = 'none'

    
    
}


