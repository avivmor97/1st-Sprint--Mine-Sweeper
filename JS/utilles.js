'use strict'


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


function updateTimer() {
    if (!gGame.isOn) return

    gGame.secsPassed++
    var elTimer = document.querySelector('.timer')
    elTimer.innerText = 'Time: ' + gGame.secsPassed
}