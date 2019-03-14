let question = 0;
let score = 0;

function handleStart() {
  $('.start').submit((event) => {
    event.preventDefault();
    console.log('`handleStart` ran');
    $('.scoreArea').removeClass('hidden');
    $('.questionArea').removeClass('hidden');
    $('.start').addClass('hidden');
    $('.logoArea').addClass('shrink');
    $('.logo').addClass('shrink');
    $('.answerArea').removeClass('hidden');
    handleQuestion();
  });
}

function generateOptions() {
  let optionsHTML = "";
  for (let i = 0; i < DEST[question].options.length; i++) {
    optionsHTML += `<div class="option">
            <input type="radio" id="Option_${i + 1}" name="option" value="${i + 1}" required><span class="checkmark"></span>
            <label for="Option_${i + 1}">${DEST[question].options[i]}</label>
          </div>`
  }
  return optionsHTML;
}

function generateDestination() {
  return `<p>Select the location and rock type of:</p>
        <span>${DEST[question].name}</span>`
}

function handleSubmission(answer) {
  console.log('`handleSubmission` ran');
  $('.go').text('Keep going!');
  if (answer === DEST[question].answer) {
    score++;
    $('.rightArea-text').html(`<p>You latched it!</p><p><img src="${DEST[question].picture}" alt="A picture of ${DEST[question].name}"></p><p>${DEST[question].name} is located in ${DEST[question].location}. The rock type is ${DEST[question].rock}, and the primary climbing discipline is ${DEST[question].style}.<p>`);
    $('.rightArea').removeClass('incorrect');
    $('.rightArea').addClass('correct');
  } else {
    $('.rightArea').removeClass('correct');
    $('.rightArea').addClass('incorrect');
    $('.rightArea-text').html(`<p>You slipped!</p><p><img src="${DEST[question].picture}" alt="A picture of ${DEST[question].name}"></p><p>${DEST[question].name} is located in ${DEST[question].location}. The rock type is ${DEST[question].rock}, and the primary climbing discipline is ${DEST[question].style}.<p>`);
  }
  toggleRightArea();
  $('.score').html(`${score}`);
}

function handleRightArea() {
  $('.rightArea').submit((event) => {
    console.log('`handleRightArea` ran');
    event.preventDefault();
    question++;
    if (question < DEST.length - 1) {
      // question++;
      toggleRightArea();
      handleQuestion();
    } else if (question === DEST.length - 1) {
      // question++;
      toggleRightArea();
      $('.right').text('Clip the anchor');
      handleQuestion();
    } else {
      console.log('`handleFinish` ran');
      toggleRightArea();
      $('.scoreArea').addClass('hidden');
      $('.questionArea').addClass('hidden');
      $('.answerArea').addClass('hidden');
      $('.finish').removeClass('hidden');
      $('.logoArea').removeClass('shrink');
      $('.logo').removeClass('shrink');
      $('.finish-text').html(generateFinishText());
    }
  });
}

function toggleRightArea() {
  console.log('`toggleRightArea` ran');
  $('.answerArea').toggleClass('hidden');
  $('.questionArea').toggleClass('hidden');
  $('.rightArea').toggleClass('hidden');
}

function handleQuestion() {
  console.log('`handleQuestion` ran');
  $('.answerArea-text').html(generateOptions());
  $('.questionArea').html(generateDestination());
  $('.question').html(`${question + 1}`);
  $('.score').html(`${score}`);
}

function handleFinish() {
  $('.answerArea').submit((event) => {
    event.preventDefault();
    handleSubmission($("input[name='option']:checked").val());
  });
}

function generateFinishText() {
  let judgement = '';
  if (score === 10) {
    judgement = 'You sent! Congrats!';
  } else if (score === 0) {
    judgement = "You didn't leave the ground. You must be new to this.";
  } else {
    judgement = "You hung a few times. Train harder!"
  }
  return `<p>Quiz Completed!</p>
          <p>Your Score: ${score}/10</p>
          <p>${judgement}</p>`
}

function handleRestart() {
  $('.finish').submit((event) => {
    event.preventDefault();
    console.log('`handleRestart` ran');
    $('.start').removeClass('hidden');
    $('.finish').addClass('hidden');
    question = 0;
    score = 0;
    $('.right').text('Go for the next hold.');
  });
}

function handleQuiz() {
  handleStart();
  handleFinish();
  handleRestart();
  handleRightArea();
}

$(handleQuiz);