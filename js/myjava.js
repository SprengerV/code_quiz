const question = document.getElementById('question');
const answers = document.getElementById('answers');
const msg = document.querySelector('#message');
const score = document.querySelector('#score');
const start = document.querySelector('#start');
const timer = document.getElementById('timer');
const round = parseInt(timer.getAttribute('data-round'));
console.log(round);

// insert questions with format " 'question', answers(strings), 'correct answer' "
const q0 = ['What is the HTML tag under which one can write the JavaScript code?','<javascript>','<script>','<scripted>','<js>','<script>'];
const q1 = ['Choose the correct JavaScript syntax to change the content of the following HTML code.','document.getElementById("geek").innerHTML="I am a Geek";','document.getElement("geek").innerHTML="I am a Geek";','document.getId("geek")="I am a Geek";','document.getElementById("geek").innerHTML=I am a Geek;','document.getElementById("geek").innerHTML="I am a Geek";',];
const q2 = ['Which of the following is the correct syntax to display "GeeksforGeeks" in an alert box using JavaScript?','alertbox("GeeksforGeeks");','msg("GeeksforGeeks");','alert("GeeksforGeeks");','msgbox("GeeksforGeeks")','alert("GeeksforGeeks");'];
const q3 = ['What is the correct syntax for referring to an external script called "geek.js"?','<script src="geek.js">','<script href="geek.js"','<script ref="geek.js">','<script name="geek.js">','<script src="geek.js">'];
const q4 = ['Which of the following is not a reserved word in JavaScript?','interface','throws','program','short','program'];
const qs = [q0, q1, q2, q3, q4];
const scores = JSON.parse(localStorage.getItem('high scores'));

// initialization (on page load)
function init(){
    msg.innerHTML = 'You have 1 minute to complete the quiz. You lose 1 point for every second you take to answer and 15 points for every question you get wrong.<br>Click START to begin.';
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
    timer.setAttribute('data-round','0');
    timer.innerHTML = time;
    question.style.fontSize = '28px'; 
    start.disabled = true;
    msg.innerHTML = 'Click the answer you think is correct.'
    
    tick(); 
    // check for wrong answers
    setInterval(function(){
        if(timer.getAttribute('data-pass') == 'wrong'){
            console.log('points deducted')
            time -=15;
            timer.setAttribute('data-pass','notWrong');
            // return time
        };
        if(time <= 0){gameOver()};
    }, 100);
    // push time to display
    setInterval(function(){timer.innerHTML = time}, 500);
    timer.style.visibility = 'visible';
    answers.style.visibility = 'visible';
    
    
    // TODO for each round play(current){}
    // start next round
    display(round);


  
};

// time ticks off
function tick(){
    setInterval(this, 1000)
    if(time > 0 && round<qs.length){
        time--;
    } else {
        clearInterval(this);
    }
};

// display a round on screen
function display(round){
    if(round<qs.length){
        console.log(`round: ${round}`);
        // current set/question
        var current = qs[round];
        // correct answer is last item in array
        let correct = current[current.length-1];
        console.log(current);
        console.log(correct);
        // push question and answers to page
        question.innerHTML = current[0];
        answers.innerHTML = '';
        
        for (i=1;i<current.length-1;i++){
            let ans = current[i];
            const item = document.createElement('li');
            item.classList.add('answer');
            item.addEventListener('click', function(event){
                let newRound = round + 1
                if (event.target.textContent != correct){
                    console.log(`my answer: ${event.target.textContent}`)
                    timer.setAttribute('data-pass','wrong');
                    timer.setAttribute('data-round',newRound)
                    if(round<qs.length){
                        display(newRound); 
                    } else{
                        gameOver();
                    };   
                }; 
                if(event.target.textContent == correct){
                    console.log(`my answer: ${event.target.textContent}`)
                    timer.setAttribute('data-round',newRound)
                    if(round<qs.length){
                        display(newRound);
                    } else{
                        gameOver();
                    };
                };
            
            }); 
            item.appendChild(document.createTextNode(ans));
            answers.appendChild(item);
        };
    } else {
        gameOver();
    };
};

function gameOver(){
    answers.style.visibility = 'hidden';
    question.innerHTML = 'GAME OVER';
    question.style.fontSize = '75px';
    msg.innerHTML = `Your score is ${time}`;
    start.disabled = false;
    start.innerHTML = 'RETRY'
};

window.onload = init();

