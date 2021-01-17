var question = document.getElementById('question');
var answers = document.getElementById('answers');
var msg = document.querySelector('#message');
var score = document.querySelector('#score');
var start = document.querySelector('#start');
var timer = document.getElementById('timer');

// insert questions with format " 'question', answers(strings), 'correct answer' "
var q0 = ['What is the HTML tag under which one can write the JavaScript code?','<javascript>','<script>','<scripted>','<js>','<script>'];
var q1 = ['Choose the correct JavaScript syntax to change the content of the following HTML code.','document.getElementById("geek").innerHTML="I am a Geek";','document.getElement("geek").innerHTML="I am a Geek";','document.getId("geek")="I am a Geek";','document.getElementById("geek").innerHTML=I am a Geek;','document.getElementById("geek").innerHTML="I am a Geek";',];
var q2 = ['Which of the following is the correct syntax to display "GeeksforGeeks" in an alert box using JavaScript?','alertbox("GeeksforGeeks");','msg("GeeksforGeeks");','alert("GeeksforGeeks");','msgbox("GeeksforGeeks")','alert("GeeksforGeeks");'];
var q3 = ['What is the correct syntax for referring to an external script called "geek.js"?','<script src="geek.js">','<script href="geek.js"','<script ref="geek.js">','<script name="geek.js">','<script src="geek.js">'];
var q4 = ['Which of the following is not a reserved word in JavaScript?','interface','throws','program','short','program'];
var qs = [q0, q1, q2, q3, q4];
var scores = JSON.parse(localStorage.getItem('high scores'));

// initialization (on page load)
function init(){
    msg.innerHTML = 'You have 2 minutes to complete the quiz. You lose 1 point for every second you take to answer and 15 points for every question you get wrong.<br>Click START to begin.';
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
    time = 120;
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
            console.log('points deducted')
            time -=15;
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
    round = 0;
    display(round);


  
};


// display a round on screen
function display(round){
    console.log(`round: ${round}`);
    // current set/question
    var current = qs[round];
    // correct answer is last item in array
    let correct = current[current.length-1];
    console.log(current);
    // push question and answers to page
    question.innerHTML = current[0];
    answers.innerHTML = '';
    (function(current){
        for (i=1;i<current.length-1;i++){
            let ans = current[i];
            const item = document.createElement('li');
            item.addEventListener('click', check());
            item.appendChild(document.createTextNode(ans));
            answers.appendChild(item);
        };
    })(current);
    // document.querySelector('li.answer').addEventListener('click', function(event){
    //     if (event.target.innerHTML != correct){
    //         console.log(`my answer: ${event.target.textContent}`)
    //         timer.setAttribute('data-pass','wrong');
    //         round++
    //         if(round<qs.length){
    //             display(round); 
    //         } else{
    //             youScored(tick);
    //         };   
    //     }; 
    //     if(event.target.innerHTML == correct){
    //         console.log(`my answer: ${event.target.textContent}`)
    //         round++
    //         if(round<qs.length){
    //             display(round);
    //         } else{
    //             youScored(tick);
    //         };
    //     };
        // answers.removeEventListener('click', this);
    // }); 
    // return current
    // console.log(`event.target.textContent = ${event.target.textContent}`);      
};
function check(event){
    if (event.target.innerHTML != correct){
        console.log(`my answer: ${event.target.textContent}`)
        timer.setAttribute('data-pass','wrong');
        round++
        if(round<qs.length){
            display(round); 
        } else{
            youScored(tick);
        };   
    }; 
    if(event.target.innerHTML == correct){
        console.log(`my answer: ${event.target.textContent}`)
        round++
        if(round<qs.length){
            display(round);
        } else{
            youScored(tick);
        };
    };
    // answers.removeEventListener('click', this);
}); 
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

