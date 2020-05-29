var canvas = document.getElementById('balls');
var ctx = canvas.getContext("2d");


var factordy;
var factordx;
var factorRadius;
var level;
var startText = true;
var finishText = false;

const btn = document.querySelector('#btn1');
$('input[type="radio"]').on('click change', function(e) {
 {
    const rbs = document.querySelectorAll('input[name="level"]');
    let selectedValue;
    var divsToHide = document.getElementsByClassName("selectLevel"); 
    for(var i = 0; i < divsToHide.length; i++){
        divsToHide[i].style.visibility = "hidden"; 
    }
    for (const rb of rbs) {
        if (rb.checked) {
            selectedValue = rb.value;
            break;
        }
    }
    level(selectedValue)
    testWebsite();
};});

function Ball(x, y) {
    this.x = x;
    this.y = y;
    this.dx = Math.random() * factordx - 1;
    this.dy = Math.random() * factordy - 1;
    this.radius = Math.random() * factorRadius + 5;
    this.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    this.draw = function () {

        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill();
        ctx.closePath();
        if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) this.dx = -this.dx;
        if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) this.dy = -this.dy;
        this.x += this.dx;
        this.y += this.dy;
    }
}

function Text(text) {
    this.text = text;
    ctx.textAlign = "center";
    ctx.font = "25px Arial";
    ctx.fillStyle = "#03e9f4";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 400, 200);
}
let click = 0;
let makeBalls = 0;
let deathBalls = 0;
let balls = [];
canvas.addEventListener('click', mouseClick);

function mouseClick(e) {

    if(!finishText){
    click++;
    let xClick = e.offsetX;
    let yClick = e.offsetY;
    let inCyrcle = true;
    let destroyedBall = false
    for (i = 0; i < balls.length; i++) {

        if (Math.pow(xClick, 2) - 2 * xClick * balls[i].x + Math.pow(balls[i].x, 2) + Math.pow(yClick, 2) - 2 * yClick * balls[i].y + Math.pow(balls[i].y, 2)
            <= Math.pow(balls[i].radius, 2)) {
            inCyrcle = true;
            destroyedBall = true;
        } else {
            inCyrcle = false;
        }

        if (inCyrcle) {
            balls.splice(i, 1);
            setTimeout(() => {
                document.body.
                    destroyedBall = true;
                deathBalls++;
                var div = document.getElementById("blood");
                div.style.backgroundColor = "red";
                setTimeout(() => { div.style.backgroundColor = "var(--bg-color)"; }, 1);
            })
            if(balls.length==0){
                finishText = true;
            }
        }

    }
    if (!destroyedBall) {
        makeTheBall(xClick, yClick);
    }
    }

}
function testWebsite() {
    level(6);
    let countOfTheBalls = document.getElementById('countOfTheBalls').value;
    startText=false
    for (let i = 0; i < countOfTheBalls; i++) {
        makeTheBall(canvas.width / 2, canvas.height / 2);
    }
}
function makeTheBall(xClick, yClick) {
    if (!startText) {
        makeBalls++;
        var ball = new Ball(xClick, yClick);
        if (ball.radius <= xClick) ball = new Ball(xClick + ball.radius, yClick);
        balls.push(ball);
        console.log(ball);
    }
}
function makeStartText(text) {
    var texttemp = new Text(text).draw;
}
var point = 0;
var name = "isnt";
function setName(){
    if(name=="isnt"){
     name = prompt("Please enter your name");
     name = capitalizeFirstLetter(name);
    }
}
function capitalizeFirstLetter(string) {
    return string.replace(/^./, string[0].toUpperCase());
}
var countPoints = deathBalls;
function makeFinshText() {
    setName();
   points = stringPointsInerToHTML();
   countPoints = deathBalls;
    var endTekst = new Text("Congratulations! " + name + " your points: " + countPoints).draw+ ". Reset game.";
    
}
let finishTextCount = true;
function moveBall() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (startText) {
        makeStartText("If you want to start the game you need choose level");
    }
    for (let i = 0; i < balls.length; i++) {
        let tempball = balls[i];
        tempball.draw();
        pointsInerToHTML();
    }
    if (finishText) {
        makeFinshText();
        if(finishTextCount){
            postPlayer(name, countPoints)
            console.log(finishTextCount);
            console.log("to")
            finishTextCount= false;
        }
        console.log(finishTextCount);
        finishTextCount= false;
       
    }
    

    requestAnimationFrame(moveBall);
}
function stringPointsInerToHTML() {

    return (" how many balls now you have on game " + balls.length +"</br>how many balls you destroyed: " +
        deathBalls + "</br>how many balls you crearted: " + makeBalls + "</br>how many click: " + click)
}
function pointsInerToHTML() {
    document.getElementById("point").innerHTML = stringPointsInerToHTML();
}
function  level(selectedValue){ 
    switch (selectedValue) {
    case "1"://easy
        factordy = 1;
        factordx = 1;
        factorRadius = 30;
        startText = false;
        break;
    case "2":// normal
        factordy = 4;
        factordx = 4;
        factorRadius = 25;
        startText = false;
        break;
    case "3":// hard
        factordy = 7;
        factordx = 7;
        factorRadius = 20;
        startText = false;
        break;
    case "4"://extremaly
        factordy = 11;
        factordx = 11;
        factorRadius = 10;
        startText = false;
        break;
    default:
        factordy = 1;
        factordx = 1;
        factorRadius = 30;
        startText = false;
        break;
    }
}
moveBall();
