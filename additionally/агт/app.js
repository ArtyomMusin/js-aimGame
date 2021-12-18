let time = 3;
let timer;
function startGame () {  
    const b = console.log('test')  
    timer = setInterval
    a()
}

function a () {
    timer = setInterval(decreaseTime, 1000);
}

function decreaseTime(){
    console.log(time)
    if (time === 0){
        clearInterval(timer)
    } else {
        time--
    }
}

startGame()