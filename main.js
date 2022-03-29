let progressBar = document.querySelector(".progress"),
  questionContent = document.querySelector(".question-content"),
  questionOptions = document.querySelector(".question-options"),
  submitAnswerBtn = document.querySelector("button.next"),
  currentQuestionSpan = document.querySelectorAll(".current"),
  totalQuestionsSpan = document.querySelector(".total"),
  results = document.querySelector(".results"),
  correctAnswersHolder = document.querySelector(".correct-answers"),
  wrongAnswersHolder = document.querySelector(".wrong-answers"),
  score = document.querySelector(".score"),
  totalScore = document.querySelector(".total-score");
let currentQuestion = 0;
let correctAnswersArr = [];
let wrongAnswersArr = [];

(function getQuestions() {
  let data = [
    {
      question: "What is the capital of India?",
      answer: "New Delhi",
      choices: "New Delhi, Mumbai, Bangalore",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
    },
    {
      question: "What is the capital of China?",
      answer: "Beijing",
      choices: "Beijing, Shanghai, Hong Kong",
    },
    {
      question: "What is the capital of Russia?",
      answer: "Moscow",
      choices: "Moscow, Saint Petersburg, Kiev",
    },
    {
      question: "What is the capital of Brazil?",
      answer: "Brasilia",
      choices: "Brasilia, Rio de Janeiro, São Paulo",
      img: "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_960_720.jpg",
    },
  ];
  console.log(data);
  beginQuiz(data);
})();

function beginQuiz(questions) {
  let questionsForCategory = questions;
  // setting total questions length to the total questions span
  totalQuestionsSpan.innerHTML = questionsForCategory.length;

  displayQuestion(currentQuestion, questionsForCategory);

  // checking on submiting answer
  function checkAnswer() {
    let options = Array.from(document.querySelectorAll(".option"));

    if (options.filter((op) => op.classList.contains("chose")).length == 0) {
      return;
    }

    let chosenAnswer = options.find((option) =>
      option.classList.contains("chose")
    ).innerHTML;

    console.log(questionContent.innerHTML.split("<img")[0]);
    let displayedQuestion = questions.find((q) =>
      q.question == questionContent.innerHTML.split("<img")[1]
        ? questionContent.innerHTML.split("<img")[1]
        : questionContent.innerHTML.split("<img")[0]
    );

    let correctAnswer = displayedQuestion.answer;

    // condition for the submitted answer
    if (chosenAnswer == correctAnswer) {
      // pushing correct answers to show them at the end

      correctAnswersArr.push({
        question: displayedQuestion.question,
        answer: correctAnswer,
        submitted: chosenAnswer,
      });
    } else {
      // pushing wrong answers to show them at the end
      wrongAnswersArr.push({
        question: displayedQuestion.question,
        answer: correctAnswer,
        submitted: chosenAnswer,
      });
    }

    if (checkToEndGame(questionsForCategory)) {
      endGame();
    } else {
      displayQuestion(++currentQuestion, questionsForCategory);
    }

    updateProgressBar(questionsForCategory.length);
    // update the question number;
    updateQuestionHTMLNumber();
  }
  submitAnswerBtn.addEventListener("click", checkAnswer);
}

function checkToEndGame(questions) {
  if (currentQuestion == questions.length - 1) {
    return true;
  } else {
    return false;
  }
}

function endGame() {
  results.classList.add("show-results");
  score.innerHTML = correctAnswersArr.length;
  totalScore.innerHTML = correctAnswersArr.length + wrongAnswersArr.length;

  correctAnswersArr.forEach((answer) =>
    createAnswers(correctAnswersHolder, answer)
  );
  wrongAnswersArr.forEach((answer) =>
    createAnswers(wrongAnswersHolder, answer)
  );

  function createAnswers(appender, answerObj) {
    let { question, submitted, answer } = answerObj;

    let answerHolder = document.createElement("div");
    answerHolder.className = "answer";

    let questionDiv = document.createElement("div");
    questionDiv.className = "question-title";
    questionDiv.appendChild(document.createTextNode(question));
    answerHolder.appendChild(questionDiv);

    let submittedAnswerSpan = document.createElement("span");
    submittedAnswerSpan.className = "submitted";
    submittedAnswerSpan.appendChild(document.createTextNode(submitted));
    answerHolder.appendChild(submittedAnswerSpan);

    let correctAnswerSpan = document.createElement("span");
    correctAnswerSpan.className = "correct";
    correctAnswerSpan.appendChild(document.createTextNode(answer));
    answerHolder.appendChild(correctAnswerSpan);

    if (answer == submitted) {
      answerHolder.innerHTML += `<ion-icon name="checkmark-outline"></ion-icon>`;
    } else {
      answerHolder.innerHTML += `<ion-icon name="add-outline"></ion-icon>`;
    }

    appender.appendChild(answerHolder);
  }
}

progressBarFilledBy = 0;

function updateProgressBar(questionsLength) {
  let increaseBy = 100 / questionsLength;
  progressBarFilledBy += increaseBy;
  progressBar.style.width = `${progressBarFilledBy}%`;
}

function updateQuestionHTMLNumber() {
  currentQuestionSpan.forEach((e) => (e.innerHTML = currentQuestion + 1));
}

function displayQuestion(questionIndex, allQuestions) {
  let { question, choices, answer, img } = allQuestions[questionIndex];

  updateQuestionHTML(question, img);

  updateChoicesHTML(choices);
}

function updateQuestionHTML(question, img) {
  if (img) {
    questionContent.innerHTML = "";
    let imgContainer = document.createElement("img");
    imgContainer.src = img ?? "";
    imgContainer.className = "question-img";
    console.log(imgContainer);
    questionContent.appendChild(document.createTextNode(question));
    questionContent.appendChild(imgContainer);
    imgContainer.className = "question-img";
  } else {
    questionContent.innerHTML = "";
    questionContent.innerHTML = question;
  }
}

function updateChoicesHTML(choices) {
  questionOptions.innerHTML = "";
  choices.split(",").forEach((choiceText, i) => {
    let choicePara = document.createElement("input");
    choicePara.type = "radio";
    choicePara.name = "choice";
    choicePara.id = i;
    let label = document.createElement("label");
    label.htmlFor = i;
    label.appendChild(document.createTextNode(choiceText));

    label.className = "option";
    questionOptions.appendChild(choicePara);
    questionOptions.appendChild(label);
    label.addEventListener("click", () => {
      document
        .querySelectorAll(".option")
        .forEach((e) => e.classList.remove("chose"));
      label.classList.toggle("chose");
    });
  });
}
