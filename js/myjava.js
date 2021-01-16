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
var round

// initialization (on page load)
function init(){
    msg.innerHTML = 'You have 1 minute to complete the quiz. You lose 1 point for every second you take to answer and 10 points for every question you get wrong.<br>Click START to begin.';
    question.innerHTML = 'CODING QUIZ';
    question.style.fontSize = '75px';
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
    question.style.fontSize = '28px'; 
    start.disabled = true;
    msg.innerHTML = 'Click the answer you think is correct.'
    // time ticks off
    var tick = function(){
        if(time > 0){
            time--;
            return time
        };
    };
    setInterval(tick, 1000); 
    // check for wrong answers
    setInterval(function(){
        if(timer.getAttribute('data-pass') == 'wrong'){
            time -=10;
            timer.setAttribute('data-pass','notwrong');
            // return time
        };
        if(time <= 0){youLose(tick)};
    }, 100);
    // push time to display
    setInterval(function(){timer.innerHTML = time}, 500);
    timer.style.visibility = 'visible';
    answers.style.visibility = 'visible';
    // TODO for each round play(current){}
    // start next round
    round = 0
    var correct = display(round); 
    answers.addEventListener('click', function(event){
        
        if(round<qs.length+1){
            if (event.target !== correct){
                timer.setAttribute('data-pass','wrong');
                round++
                display(round);    
            }; 
            if(event.target == correct){
                round++
                display(round);
            };
        } else{
            clearInterval(tick);
            youScored(tick);
        };
    });   
};


// display a round on screen
function display(round){
    console.log(`round: ${round}`);
    // current set/question
    var current = qs[round];
    var rand = Math.round(Math.random()*3 + 1);
    console.log(`correct answer should be: ${rand}`);
    // swap correct answer (node 1) into random spot
    const oddManOut = current[rand];
    current.splice(rand, 1, current[1]);
    current[1] = oddManOut;
    console.log(current);
    // push question and answers to page
    question.innerHTML = current[0];
    for (i=1;i<current.length;i++){
        let ans = current[i];
        answers.children[i-1].textContent = ans;
    };
    console.log(current[rand]);
    return current[rand];
 
    // jumble answers so the correct one isn't in the same place everytime
    // picks a random number, and switches the correct answer with that node on the list

};
// if clock reaches 0
function youLose(){
    answers.style.visibility = 'hidden';
    question.innerHTML = 'GAME OVER';
    question.style.fontSize = '75px';
    msg.innerHTML = 'You can\'t make the leaderboard with no points. <br>Click START to try again.';
    start.disabled = false;
    start.innerHTML = 'RETRY'
};
function endGame(){
    init();
};

window.onload = init();

