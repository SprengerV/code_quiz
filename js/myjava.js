var question = document.getElementById('question');
var answers = document.getElementById('answers');
var msg = document.querySelector('#message');
var score = document.querySelector('#score');
var start = document.querySelector('#start');
var timer = document.getElementById('timer');

var q0 = ['What is the HTML tag under which one can write the JavaScript code?','<script>','<javascript>','<scripted>','<js>'];
var q1 = ['Choose the correct JavaScript syntax to change the content of the following HTML code.','document.getElementById("geek").innerHTML="I am a Geek";','document.getElement("geek").innerHTML="I am a Geek";','document.getId("geek")="I am a Geek";','document.getElementById("geek").innerHTML=I am a Geek;'];
var q2 = ['Which of the following is the correct syntax to display "GeeksforGeeks" in an alert box using JavaScript?','alert("GeeksforGeeks");','alertbox("GeeksforGeeks");','msg("GeeksforGeeks");','msgbox("GeeksforGeeks")'];
var q3 = ['What is the correct syntax for referring to an external script called "geek.js"?','<script src="geek.js">','<script href="geek.js"','<script ref="geek.js">','<script name="geek.js">'];
var q4 = ['Which of the following is not a reserved word in JavaScript?','program','interface','throws','short'];
var qs = [q0, q1, q2, q3, q4];
var scores = JSON.parse(localStorage.getItem('high scores'));
var time

// initialization (on page load)
function init(){
    msg.innerHTML = 'You have 1 minute to complete the quiz. You lose 1 point for every second you take to answer and 10 points for every question you get wrong.<br>Click START to begin.';
    question.innerHTML = 'CODING QUIZ';
    answers.style.visibility = 'hidden';
    timer.style.visibility = 'hidden';
    score.innerHTML = getScores();
    start.disabled = false;
    start.addEventListener('click', startGame);
}
// TODO: check for highscore
function getScores(){
    if (scores === null){
        return 'You haven\'t scored yet.';
    } else {
        return `Current high score: ${scores.one}`
    }

}
// what happens when you click start

function startGame(){
    time = 60;
    timer.innerHTML = time; 
    start.disabled = true;
    msg.innerHTML = 'Click the answer you think is correct.'
    displayqs();
    countdown(time);
    document.getElementById('timer').style.visibility = 'visible';
    
}
// show the questions/answers
function displayqs(){
    for (const q of qs){
        question.innerHTML = q[0];
        const correct = q[1];
        // picks a random number, and switches the correct answer with that node on the list
        rand = Math.round(Math.random()*3 + 1);
        console.log(`correct answer should be: ${rand}`);
        const oddManOut = q[rand];
        q.splice(rand, 1, q[1]);
        q[1] = oddManOut;
        console.log(q);
        // sets each possible answer in a spot on the page
        for (i=0;i<4;i++){
            answers.children[i].innerHTML = q[i+1];
            answers.style.visibility = 'visible';
        }
        
    }
}
// timer
function countdown(time){
    var tick = setInterval(function(){
        time--;
        timer.innerHTML = time; 
        if (time <= 0) {
            youLose();
            clearInterval(tick);
        }
    }, 1000);
}
// if clock reaches 0
function youLose(){
    answers.style.visibility = 'hidden';
    question.innerHTML = 'GAME OVER';
    msg.innerHTML = 'You can\'t make the leaderboard with no points. <br>Click START to try again.';
    start.disabled = false;
}

window.onload = init();

