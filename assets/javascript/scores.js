function printScore() {
  // Gets the scores from localStorage, if not will create empty array
  var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

  // Sorts scores by highest time left
  highscores.sort(function(a, b){
      return b.score - a.score;
  });

  // Creates li elements per score entered
  highscores.forEach(function(score){
      
      var liEl = document.createElement("li");

      liEl.textContent = score.initials + " - " + score.score;

      // Displays scores
      var olEl = document.getElementById("highscores");
      olEl.appendChild(liEl);
  });
}

// Removes highscores key from local storage, then refreshes page
function clearScore () {
  window.localStorage.removeItem("highscores");
  window.location.reload();
}

document.getElementById("clear").onclick = clearScore;
// Runs function once the page is loaded
printScore();