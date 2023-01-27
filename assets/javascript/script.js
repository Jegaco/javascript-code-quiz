// Variable containing questions to be pulled from
var questions = [
  {
    question: "Javascript is a ______ language.",
    choices: ["Object-oriented", "Object-based", "Procedural", "None of the above"],
    answer: "Object-based",
  },

  {
    question: "Commonly used data types DO NOT include",
    choices: ["Strings", "Booleans", "Alerts", "Numbers"],
    answer: "Alerts"
  },

  {
    question: "A string:",
    choices: ["Expresses a true false statement.", "Can contain letters, numbers and symbols.", "Takes an input, does something with it and then returns an output.", "Runs a boolean(true/false) statement based on data entered."],
    answer: "Can contain letters, numbers and symbols."
  },

  {
    question: "The first index of an array is _____",
    choices: ["1", "2", "0", "None of the above"],
    answer: "0"
  },

  {
    question: "How do you stop an interval timer in JavaScript?",
    choices: ["clearInterval", "clearTimer", "intervalOver", "None of the above"],
    answer: "clearInterval"
  }
];

// Variables to keep track of DOM elements
var quizEl = document.getElementById("quiz");
var timerEl = document.getElementById("timer");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit-score");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("name");
var feedbackEl = document.getElementById("feedback");

// Variables for quiz functions
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

function startQuiz() {
  // Hides the beginning of the quiz by setting display to none
  var beginQuiz = document.getElementById("play");
  beginQuiz.style.display = "none"
  
  // Displays quiz question and answers
  // quizEl contains class "hide" which has display property of none, removing this get rid of that styling
  quizEl.removeAttribute("class");


  // Starts Timer and shows the time
  timerId = setInterval(timeRem, 1000);
  timerEl.textContent = time;

  getQuestions();
}

function getQuestions() {
  // Pulls the current question object from array
  var currentQuestion = questions[currentQuestionIndex];

  // Updates the title of current question
  var questionsEl = document.getElementById("questions");
  questionsEl.textContent = currentQuestion.question;

  // Clears previous questions
  choicesEl.innerHTML = "";

  // Creates a button for each choice
  currentQuestion.choices.forEach(function(choice, i){
      var choiceBtn = document.createElement("button");
      choiceBtn.setAttribute("class", "choice");
      choiceBtn.setAttribute("value", choice);
      choiceBtn.textContent = i + 1 + ". " + choice;

      // Adds click event listener and displays the button on the screen
      choiceBtn.onclick = questionClick;
      choicesEl.appendChild(choiceBtn);
  });
}

// Function checks if value selected matches answer in object array, if not subtracts 15 from time left
function questionClick() {
  if (this.value !== questions[currentQuestionIndex].answer) {
      time -= 15;

      if (time < 0) {
          time = 0;
      }

  // Displays current time and whether selection was wrong or right
   timerEl.textContent = time;
   feedbackEl.textContent = "Wrong Answer";
   feedbackEl.style.color = "red";
    
  } else {
      feedbackEl.textContent = "Right Answer";
      feedbackEl.style.color = "green";
     
  }
  // Will display wether or not the answer was Correct or Incorrect, then remove it once next question is started
  feedbackEl.setAttribute("class", "feedback",);
  setTimeout(function() {
      feedbackEl.setAttribute('class', "feedback hide");
  }, 1000);
  // Cycles through the questions
  currentQuestionIndex++;
  // Checks the timer to make sure all questions have been answered, or will cycle through remaining questions.
  if (currentQuestionIndex === questions.length) {
      quizEnd();
  } else {
      getQuestions();
  }
}

function quizEnd() {
  // Stops the timer
  clearInterval(timerId);

  // Displays results page
  var resultsEl = document.getElementById("quiz-results");
  resultsEl.removeAttribute("class");


  // Displays final score and removes questions displayed
  var finalScore = document.getElementById("final-score");
  finalScore.textContent = time;
  quizEl.style.display = "none";
}

// Updates time remaining
function timeRem() {
  time--;
  timerEl.textContent = "Time Remaining " + time;
  // Will check to see if timer has ran out
  if (time <= 0) {
      quizEnd();
  }
}


function saveScore(event) {
  // Retreives value from textbox, .trim() used to remove any blank spaces after initials, if any
  var initials = initialsEl.value.trim();
  if (initials !== "") {
      // Pulls scores from localStorage, or sets an empty array
      var highscores = 
      JSON.parse(window.localStorage.getItem("highscores")) || [];

      // Formats new score for localStorage
      var newScore = {
          score: time,
          initials : initials
      };
      // Score and Initials stored in highscores key on local storage
      highscores.push(newScore);

      // Turns stored data in key to a string to be used
      window.localStorage.setItem("highscores", JSON.stringify(highscores));

      // Loads leaderboard page
      window.location.href = "./leaderboard.html";
  }
}


// Checks for "Enter" key on keyup in the event Submit button is not triggered
function checkForEnter(event) {
  if (event.key === "Enter") {
      saveScore();
  }
}

// On user click runs saveScore function
submitBtn.onclick = saveScore;

// On user click runs startQuiz function
startBtn.onclick = startQuiz;

// Runs checkForEnter function
initialsEl.onkeyup = checkForEnter;