const score = document.querySelector('.score');
const startscreen = document.querySelector('.startscreen');
const gameArea = document.querySelector('.gameArea');

console.log(gameArea);

startscreen.addEventListener('click', starts);
let player ={speed : 5,score: 0};

let keys = {ArrowUp : false, ArrowDown: false , ArrowLeft : false,  ArrowRight : false}

document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);

function keyDown(e){
    e.preventDefault();
    keys[e.key]= true;
    //console.log(keys);
}

function keyUp(e){
    e.preventDefault();
    keys[e.key]= false;
    //console.log(keys);
    
}
function isCollide(a,b)
{
    arect=a.getBoundingClientRect();
    brect=b.getBoundingClientRect();

    return !((arect.top >brect.bottom)||(arect.right < brect.left)||(arect.left >brect.right)||(arect.bottom <brect.top))
}
function moveLines(){

    let lines = document.querySelectorAll('.lines');

    lines.forEach(function(item){

        if(item.y >=700)
        {
            item.y -=750;
        }
        item.y +=player.speed;
        item.style.top=item.y +"px";

    })
}
function  endGame(){
    player.start=false;
    startscreen.classList.remove('hide');
    startscreen.innerHTML="Game over <br> Your final score is:"+player.score+"<br> Press here to restart the game"; 
}
function moveEnemy(car){

    let enemy = document.querySelectorAll('.enemy');

    enemy.forEach(function(item){

        if(isCollide(car,item)){
            console.log("boom");
            endGame();
        }
        if(item.y >=750)
        {
            item.y =-300;
            item.style.left=Math.floor(Math.random() * 350)+"px";
        }
        item.y +=player.speed;
        item.style.top=item.y +"px";

    })
}
function gamePlay(){


    //console.log("i m clicked");

    let car= document.querySelector('.car');
    let road= gameArea.getBoundingClientRect();
    //console.log(road);
    if(player.start){

        moveLines();
        moveEnemy(car);
        if(keys.ArrowUp && (player.y>road.top +70)){

            player.y-=player.speed
        }
        if(keys.ArrowDown && player.y <(road.bottom-70)){
            player.y+=player.speed
        }
        if(keys.ArrowLeft  && player.x>0){
            player.x-=player.speed
        }
        if(keys.ArrowRight && player.x <(road.width-50)){
            player.x+=player.speed
        }
        car.style.top = player.y + "px";
        car.style.left = player.x + "px";

        window.requestAnimationFrame(gamePlay);
       console.log(player.score++);

       player.score++;
       let ps = player.score -1;
       score.style.innerText = "Score: "+ps;
    }
  
}

function starts(){

  // gameArea.classList.remove('hide');
    startscreen.classList.add('hide');
    gameArea.innerHTML="";
    player.start= true;
    player.score= 0;
    window.requestAnimationFrame(gamePlay);

    for(x=0; x<5;x++){
    let roadLine = document.createElement('div');
    roadLine.setAttribute('class','lines');
    roadLine.y=(x*150);
    roadLine.style.top=(x*150)+"px";
    gameArea.appendChild(roadLine);
    }

    let car = document.createElement('div');
    car.setAttribute('class','car');
    
    gameArea.appendChild(car);
    

    player.x=car.offsetLeft;
    player.y = car.offsetTop;

    for(x=0; x<3;x++){
        let enemycar = document.createElement('div');
        enemycar.setAttribute('class','enemy');
        enemycar.y=((x+1)*350)*-1;
        enemycar.style.top=enemycar.y+"px";
        enemycar.style.background=randomColor();
        enemycar.style.left=Math.floor(Math.random() * 350)+"px";
        gameArea.appendChild(enemycar);
        }
}
function randomColor(){
    function c(){
        let hex = Math.floor(Math.random()* 256).toString(16);
        return ("0" + String(hex)).substr(-2);
    }
    return  "#"+c()+c()+c();
}