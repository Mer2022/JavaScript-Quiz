// Bringing HTML elements together for manipulation
var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

// Quiz questions
var quizQuestions = [{
    question: "Inside which HTML element do we put the JavaScript?",
    choiceA: "< scripting >",
    choiceB: "< js >",
    choiceC: "< script >",
    choiceD: "< javascript >",
    correctAnswer: "c"},
  {
    question: "Where is the correct place to insert a JavaScript?",
    choiceA: "The < head > section",
    choiceB: "The < footer > section",
    choiceC: "the < body > section",
    choiceD: "both a and b",
    correctAnswer: "c"},
   {
    question: "How do you write `Hello World` in an alert box?",
    choiceA: "msg(`Hello World`);",
    choiceB: "msgBox(`Hello World`);",
    choiceC: "alertBox(`Hello World`);",
    choiceD: "alert(`Hello World`);",
    correctAnswer: "d"},
    {
    question: "How to write an IF statement in JavaScript?",
    choiceA: "if i == 5 then",
    choiceB: "if i = 5",
    choiceC: "if i = 5 then",
    choiceD: "if (i == 5)",
    correctAnswer: "d"},
    {
    question: "How does a WHILE loop start?",
    choiceA: "while i = 1 to 10",
    choiceB: "while (i <= 10)",
    choiceC: "while (i <= 10; i++)",
    choiceD: "None of the answers above",
    correctAnswer: "b"},  
    {
    question: "How does a FOR loop start?",
    choiceA: "for (i = 0; i <= 5)",
    choiceB: "for (i <= 5; i++)",
    choiceC: "for i = 1 to 5",
    choiceD: "for (i = 0; i <= 5; i++)",
    correctAnswer: "d"},
    {
    question: "How can you add a comment in a JavaScript?",
    choiceA: "`This is a comment",
    choiceB: "< !--This is a comment-- >",
    choiceC: "//This is a comment",
    choiceD: "#This is a comment#",
    correctAnswer: "c"},
        
    
    ];
// Other global variables
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 60;
var timerInterval;
var score = 0;
var correct;

// This function will cycle through the object array containing the quiz questions to generate the questions and answers.
function generateQuizQuestion(){
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

// Start Quiz function starts the TimeRanges, hides the start button, and displays the first quiz question.
function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //Timer
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Seconds left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizBody.style.display = "block";
}
// This function will show score after completing quiz.
function showScore(){
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

// After clicking submit button, we run the function highscore that saves and stringifies the array of high scores that are already saved in local storage
// as well as pushing the new user name and score into the array that is being saved in local storage. Then it runs the function to show high scores.
submitScoreBtn.addEventListener("click", function highscore(){
    
    
    if(highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});

// This function clears the list for the high scores and generates a new high score list from local storage
function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

// This function will only show the high score page
function showHighscore(){
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

// This function clears the local storage and text from high score boards
function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

// This function sets all the variables back to their original values and shows the home page to enable replay of the quiz
function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 60;
    score = 0;
    currentQuestionIndex = 0;
}

// This function gives response to each answer that is either correct or incorrect
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("Good Job! That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
        //Results show that the answer is correct.
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("Sorry, That Is Incorrect.")
        currentQuestionIndex++;
        generateQuizQuestion();
        //Results show that the answer is wrong.
    }else{
        showScore();
    }
}

// This button will start the quiz
startQuizButton.addEventListener("click",startQuiz);
