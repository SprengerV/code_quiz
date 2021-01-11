var quizbox = document.querySelector('#quizbox');
var question = document.querySelector('#question');
var answers = document.querySelector('#answers');
var status = document.getElementById('status');
var score = document.querySelector('#score')
var startbox = document.querySelector('#startbox');
var start = document.querySelector('#start');
var timer = document.querySelector('#timer');

var qa = ['What is the HTML tag you write JavaScript code under?', 'script', 'What function in JavaScript is used to display an alert box to the user?', 'alert()',]

var time
// initialization (on page load)
function init(){
    status.innerHTML = 'You have 2 minutes to complete the quiz. You lose 1 point for every second you take to answer and 15 points for every question you get wrong. Click START to begin.';
    question.innerHTML = 'CODING QUIZ'
    answers.setAttribute('style','display:hidden');
    timer.setAttribute('style','display:hidden');
    score.innerHTML = checkscore();
}
// TODO: check for highscore
function checkscore(){

}
// what happens when you click start
function startgame(){
    time = 120;
    // TODO: disable start button
    // displayqs();
    timer.setAttribute('display','visible');
    displayt();
    countdown(time);
}
// timer
function countdown(time){
    setInterval(countdown(time), 1000);
    if (time > 0){
        displayt(time);
        time--;
    } else if (time === 0){
        displayt(time);
        return youlose();
    }
}
// push time to the display
function displayt(){
    timer.innerHTML = time;
}

window.onload = init();
