const gameboard=document.getElementById('gameboard');
const context=gameboard.getContext('2d');
const scoretext=document.getElementById('scoreval');

const W=gameboard.width;
const H=gameboard.clientHeight;
const U= 25;

let foodx;
let foody;
let xvel=25;
let yvel=0;
let score=0;
let active=true;
let started=false;



let snake=[
    {x:U*3,y:0},
    {x:U*2,y:0},
    {x:U,y:0},
    {x:0,y:0}
]

window.addEventListener('keydown',keypress)

startGame();

function startGame(){
    context.fillStyle= '#212121';
    context.fillRect(0,0,W,H);
    createfood();
    displayfood();
    drawsnake();
    //movesnake();
    //clearboared();
    


}
function clearboared(){
    context.fillStyle= '#212121';
    context.fillRect(0,0,W,H);
}

function createfood(){
    foodx=Math.floor(Math.random()*W/U)*U;
    foody=Math.floor(Math.random()*H/U)*U;


}

function displayfood(){
    context.fillStyle= 'red';
    context.fillRect(foodx,foody,U,U);
    
   
}
function drawsnake(){
    context.fillStyle='aqua';
    context.strokeStyle='#212121';
    snake.forEach((snakepart)=>{
        context.fillRect(snakepart.x,snakepart.y,U,U)
        context.strokeRect(snakepart.x,snakepart.y,U,U)
    })

}
function movesnake(){
    const head={x:snake[0].x+xvel,
        
                y:snake[0].y+yvel}
    snake.unshift(head)
    if(snake[0].x==foodx && snake[0].y==foody){
        score+=1;
        scoretext.textContent=score;
        createfood();
    }else{
        snake.pop()
    }
  
}
function nexttick(){
    if(active){
    setTimeout(()=>{
        clearboared();
        displayfood();
        movesnake();
        drawsnake();
        checkgameover();
        nexttick();

    },300);
  }else{
    clearboared();
    context.font="bold 50px serif";
    context.fillStyle="white";
    context.textAlign="center";
    context.fillText("Game Over!!Ganesh",W/2,H/2)
  }
}

function keypress(event){
    if(!started){
        started=true;
        nexttick();
    }
    const LEFT=37
    const UP=38
    const RIGHT=39
    const DOWN=40

    switch(true){
        case(event.keyCode==LEFT  &&  xvel!=U):
            xvel=-U;
            yvel=0;
            break;
        case(event.keyCode==RIGHT && xvel!=-U):
            xvel=U;
            yvel=0;
            break;
        case(event.keyCode==UP && yvel!=U):
            xvel=0;
            yvel=-U;
            break;
        case(event.keyCode==DOWN && yvel!=-U):
            xvel=0;
            yvel=U;
            break;
            
            
    }
}
function checkgameover(){
    switch(true){
        case(snake[0].x<0):
        case(snake[0].x>=W):
        case(snake[0].y<0):
        case(snake[0].y>=H):
        active=false;
        break;
    }
}
