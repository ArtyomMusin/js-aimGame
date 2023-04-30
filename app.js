const startBtn = document.querySelector('.start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
let time = 0
let score = 0

startBtn.addEventListener('click', event => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

let timer;
function startGame () {
    setTime(time) 
    createRandomCircle() 
    
    timer = setInterval(decreaseTime, 1000)
}

function decreaseTime () {
    if (time === 0) {
        clearInterval(timer)
        finishGame() 
    } else {   
        let current = --time         
        setTime(current)   
    }      
}

function setTime (value) {
    if (value < 10) {
       return timeEl.innerHTML = `00:0${value}`
    }
    timeEl.innerHTML = `00:${value}`        
}

function finishGame () {
    board.innerHTML = `
        <h1>Счет: <span class="primary">${score}</span></h1>
        <h2><a class="restart">Try again<a></h2>
    `
    const restartBtn = document.querySelector('.restart')
    restartBtn.addEventListener('click', restartGame)
    
    timeEl.parentNode.classList.add('hide')
}

function restartGame () {
    screens[1].classList.remove('up')
    board.innerHTML = ''
    timeEl.parentNode.classList.remove('hide')
    score = 0
}

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(5, 20)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.left = `${(x)}px`
    circle.style.top = `${(y)}px`
    circle.style.background = `linear-gradient(90deg, ${randomColor()} 0%, ${randomColor()} 47%, ${randomColor()} 100%)`

    board.append(circle)
}

function randomColor () {
    const r = getRandomNumber(0, 255)
    const g = getRandomNumber(0, 255)
    const b = getRandomNumber(0, 255)
    return `#${rgbToHex(r)}${rgbToHex(g)}${rgbToHex(b)}`
}

function rgbToHex (rgb) {
    const hex = rgb.toString(16)
    if (hex.length === 1){
        return `0${hex}`
    }
    return hex
}

function getRandomNumber (min, max) {
    return Math.round(Math.random() * (max-min) + min)
}