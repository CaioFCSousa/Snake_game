const canvas = document.querySelector("canvas")
const score = document.querySelector(".score--value")
const finalScore = document.querySelector(".final-score > span")
const menu = document.querySelector(".menu-screen")
const btnPlay = document.querySelector(".btn-play")
const ctx = canvas.getContext("2d")

const size = 30
const initialPosition = {x:270,y:240}
let snake = [initialPosition]

const incrementScore = () =>{
    score.innerText=+score.innerText +10 
}

const randomNumber = (min,max) =>{
    return Math.round(Math.random() * (max-min) + min)
}
const ransomPosition = () =>{
    const number = randomNumber(0,canvas.width - size)
    return Math.round(number/30)*30
}
randomColor = () =>{
    const red = randomNumber(0,255)
    const green = randomNumber(0,255)
    const blue = randomNumber(0,255)
    return `rgb(${red},${green},${blue})`
}

const food = {
    x:ransomPosition(),
    y:ransomPosition(),
    color:randomColor()
}


let direction,loopId 

const drawFood = (()=>{

    const {x,y,color} = food

    ctx.shadowColor = color
    ctx.shadowBlur = 20
    ctx.fillStyle = color
    ctx.fillRect(x,y,size,size)
    ctx.shadowBlur = 0
})

const drawSnake = ()=>{
    

    snake.forEach((position,index)=>{

        if(index == snake.length -1){
            ctx.fillStyle = "#ffff"
        }else{
            ctx.fillStyle = "#333"
        }
        ctx.fillRect(position.x,position.y,size,size)

    })
}

const moveSneke =()=>{

    if(!direction) return 
    
    const head = snake[snake.length - 1]
   
    
    if(direction == "right"){
        snake.push({x:head.x+size,y:head.y})
        
    }
    if(direction == "left"){
        snake.push({x:head.x-size,y:head.y})
        
    }
    if(direction == "down"){
        snake.push({x:head.x,y:head.y+size})
        
    }
    if(direction == "up"){
        snake.push({x:head.x,y:head.y-size})
        
    }
    snake.shift()
}

const drawGrid = (()=>{
    
    ctx.lineWidth = 1
    ctx.strokeStyle = "#191919"


    for(let i =30;i < canvas.width;i+=30){
        ctx.beginPath()
        ctx.lineTo(i,0)
        ctx.lineTo(i,600)
        ctx.stroke()

        ctx.beginPath()
        ctx.lineTo(0,i)
        ctx.lineTo(600,i)
        ctx.stroke()
    }

    
})

const chackEat = ()=>{
    const head = snake[snake.length - 1]

    if(head.x == food.x && head.y == food.y){
        snake.push(head)
        incrementScore()
        let x = ransomPosition()
        let y =ransomPosition()
        

        while(snake.find((position)=> position.x == x && position.y == y)){
            x = ransomPosition()
            y =ransomPosition()

        }
        food.x = x
        food.y = y
        food.color =randomColor()
    }
}

const chackCollision = ()=>{
    const head = snake[snake.length-1]
    const canvaLimet = canvas.width-size
    const snakeIndex = snake.length -2
    const wallColilision = head.x < 0||head.x>canvaLimet ||head.y < 0||head.y > canvaLimet

    const selfCollision = snake.find((position,index)=>{
        return index < snakeIndex &&  position.x == head.x && position.y == head.y
    }) 
    if(wallColilision || selfCollision){
        gameOver()
    }
}

const gameOver = ()=>{
    direction = undefined
    menu.style.display = "flex"
    finalScore.innerText = score.innerText
    canvas.style.filter = "blur(2px)'"

}

const gameLoop =(()=>{
    clearInterval(loopId)

    ctx.clearRect(0,0,600,600)
    drawGrid()
    drawFood()
    moveSneke()
    drawSnake()
    chackEat()
    chackCollision()

    loopId = setTimeout(()=>{
        gameLoop()
    },200)
})

gameLoop()

document.addEventListener("keydown",(({key})=>{

    if(key == "ArrowRight" && direction != "left"){
        direction = "right"
    }
    if(key == "ArrowLeft" && direction != "right"){
        direction = "left"
    }
    if(key == "ArrowDown" && direction != "up"){
        direction = "down"
    }
    if(key == "ArrowUp" && direction != "down"){
        direction = "up"
    }
    
}))
btnPlay.addEventListener("click",() =>{
    score.innerText = "00"
    menu.style.display = "none"
    canvas.style.filter = "none"
    snake = [initialPosition]
})
