const questions = [
  {
    question: "Which language runs in a web browser?",
    answers: [
      { text: "Java", correct: false },
      { text: "C", correct: false },
      { text: "JavaScript", correct: true },
      { text: "Python", correct: false }
    ]
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Central Style Sheets", correct: false },
      { text: "Cascading Style Sheets", correct: true },
      { text: "Cascading Simple Sheets", correct: false },
      { text: "Cars SUVs Sailboats", correct: false }
    ]
  },
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hypertext Markup Language", correct: true },
      { text: "Hypertext Markdown Language", correct: false },
      { text: "Hyperloop Machine Language", correct: false },
      { text: "Helicopters Terminals Motorboats Lamborginis", correct: false }
    ]
  },
  {
    question: "Which company developed the React library?",
    answers: [
      { text: "Apple", correct: false },
      { text: "Google", correct: false },
      { text: "Facebook", correct: true },
      { text: "Microsoft", correct: false }
    ]
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    answers: [
      { text: "//", correct: true },
      { text: "/* */", correct: true },
      { text: "#", correct: false },
      { text: "<!-- -->", correct: false }
    ]
  }
];

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const resultContainer = document.getElementById('result-container');
const scoreElement = document.getElementById('score');
const totalQuestionsElement = document.getElementById('total-questions');
const quizContainer = document.getElementById('quiz-container');
const restartButton = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let score = 0;

// Start the quiz
startQuiz();

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  resultContainer.classList.add('hide');
  quizContainer.classList.remove('hide');
  nextButton.disabled = true;
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  // Create buttons for each answer
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.textContent = answer.text;
    button.classList.add('btn');
    answerButtonsElement.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
  });
}

function resetState() {
  nextButton.disabled = true;
  // Remove old answer buttons
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";

  // Highlight correct and wrong answers
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct === "true");
    button.disabled = true;
  });

  if (correct) {
    score++;
  }

  nextButton.disabled = false;
}

function setStatusClass(element, correct) {
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

// Next button click event
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

// Restart button click event
restartButton.addEventListener('click', () => {
  startQuiz();
});

function showResult() {
  quizContainer.classList.add('hide');
  resultContainer.classList.remove('hide');
  scoreElement.textContent = score;
  totalQuestionsElement.textContent = questions.length;
}
