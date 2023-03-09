
// Adding HTML elements together for use
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

// Questions included in Quiz
var quizQuestions = [{
    question: "Which of the following keywords is used to define a variable in JavaScript?",
    choiceA: "var",
    choiceB: "let",
    choiceC: "both A and B",
    choiceD: "none of the above",
    correctAnswer: "c"},
 
    {
    question: "Which of the following methods is used to access HTML elements using JavaScript?",
    choiceA: "getElementbyId()",
    choiceB: "getElementsByClassName()",
    choiceC: "Both A and B",
    choiceD: "none of the above",
    correctAnswer: "c"},
   
    {
    question: "Upon encountering empty statements, what does the JavaScript Interpreter do?",
    choiceA: "Throws an error",
    choiceB: "Ignores the statements",
    choiceC: "Gives a warning",
    choiceD: "None of the above",
    correctAnswer: "b"},
    
    {
    question: "Which of the following methods can be used to display data in some form using JavaScript?",
    choiceA: "document.write()",
    choiceB: "console.log()",
    choiceC: "window.alert()",
    choiceD: "All of the above",
    correctAnswer: "d"},
    
    {
    question: "How can a datatype be declared to be a constant type?",
    choiceA: "const",
    choiceB: "var",
    choiceC: "let",
    choiceD: "constant",
    correctAnswer: "a"},  
    
    {
    question: "When an operator's value is NULL, the typeof returned by the unary operator is?",
    choiceA: "Boolean",
    choiceB: "Undefined",
    choiceC: "Object",
    choiceD: "Integer",
    correctAnswer: "c"},
   
    {
    question: "Which function is used to serialize an object into a JSON string in JavaScript",
    choiceA: "stringify()",
    choiceB: "parse()",
    choiceC: "convert()",
    choiceD: "None of the above",
    correctAnswer: "a"},
        
    
    ];
// Other global variables
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 60;
var timerInterval;
var score = 0;
var correct;

// The following function is used to cycle through the object array that contains the quiz questions so that it can generate the questions and answers.
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

// The Start Quiz function gets the TimeRanges started, displays the first quiz question and hides the Start button.
function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //Information for Timer
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

// This function allows quiz score to be revealed after quiz completion.
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

// This button allows the quiz to start.
startQuizButton.addEventListener("click",startQuiz);
