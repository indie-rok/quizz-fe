import './style.css'
import quizData from './quizzData';

document.addEventListener('DOMContentLoaded', () => {
  let currentQuestionIndex = 0;
  let score = 0;

  const questionElement = document.getElementById('question');
  const optionsElement = document.getElementById('options');
  const feedbackElement = document.getElementById('feedback');
  const scoreElement = document.getElementById('score');
  const progressBar = document.getElementById('progress-bar');
  const nextButton = document.getElementById('next');
  const endScreen = document.getElementById('end-screen');
  const finalScoreElement = document.getElementById('final-score');
  const submitScoreButton = document.getElementById('submit-score');

  function submitScoreToLeaderboard(name) {
    fetch('https://back-end-quizz.onrender.com/leaderboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, score }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => console.log(data.message))
      .catch(error => console.error('There has been a problem with your fetch operation:', error));
  }

  function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
    progressBar.style.width = `${progress}%`;
  }

  function showQuestion(question) {
    if (currentQuestionIndex < quizData.length) {
      questionElement.innerText = question.question;
      optionsElement.innerHTML = '';
      question.answers.forEach(answer => {
        const button = document.createElement('li');
        button.innerText = answer.text;
        button.addEventListener('click', () => selectAnswer(answer));
        optionsElement.appendChild(button);
      });
      updateProgressBar();
    }
  }

  function selectAnswer(answer) {
    feedbackElement.innerText = answer.explanation;
    if (answer.correct) {
      score++;
    }
    scoreElement.innerText = `Score: ${score}`;
    if (currentQuestionIndex < quizData.length - 1) {
      nextButton.innerText = "Next";
    } else {
      nextButton.innerText = "Finish";
    }
  }

  function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
      showQuestion(quizData[currentQuestionIndex]);
      feedbackElement.innerText = '';
    } else {
      // Show end screen
      questionElement.style.display = 'none';
      optionsElement.style.display = 'none';
      feedbackElement.style.display = 'none';
      nextButton.style.display = 'none';
      scoreElement.style.display = 'none';
      progressBar.parentElement.style.display = 'none';

      endScreen.style.display = 'block';
      finalScoreElement.innerText = score;
    }
  }

  nextButton.addEventListener('click', showNextQuestion);

  // Simulate score submission (adjust according to your backend implementation)
  submitScoreButton.addEventListener('click', () => {
    let playerName = document.getElementById("player-name").value
    submitScoreToLeaderboard(playerName, playerScore);
    alert('Score submitted!');
  });

  showQuestion(quizData[currentQuestionIndex]);
});
