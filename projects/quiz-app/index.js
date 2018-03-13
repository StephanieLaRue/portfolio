'use strict';


$(document).ready(function() {
    $.getJSON('/quiz-app', function(data) {
    console.log(data);
      quizApp(data)
    })
})

function quizApp(quizData) {
  let user_input = [];
  let correctAnswers = 0;
  let incorrectAnswers = 0;

  quizData.forEach((data, questionIndex) => {
    let div = document.createElement('div');
    div.className = 'qaHolder';
    let questionDiv = document.createElement('div');
    questionDiv.className = 'question'
    let questionText = document.createTextNode(data.question);
    questionDiv.appendChild(questionText)
    div.appendChild(questionDiv)
    data.answers.forEach((answer, index) => {
      let text = document.createTextNode(answer);
      let ul = document.getElementById('list');

      let li = document.createElement('li');

      li.className = 'listItem';

      let input = document.createElement('input');
      input.name = data.question;
      input.type = 'radio';
      input.value = answer;
      input.className = 'radioButton';

      input.addEventListener('click', function() {

        if (user_input[questionIndex] === data.correctAnswer && this.value !== data.correctAnswer) {
          correctAnswers--;
        }
        if(this.value === data.correctAnswer) {
          correctAnswers++;
        }
        user_input[questionIndex] = this.value;
      });

      let text2 = document.createTextNode(answer);
      input.appendChild(text)
      li.appendChild(input);
      li.appendChild(text2);
      div.appendChild(li)
      ul.appendChild(div)
    })
  })
  let submitButton = document.getElementById('submit');
  submitButton.addEventListener('click', function() {
      let result = document.createTextNode('You answered ' + correctAnswers + ' question(s) correctly.');
      let display = document.getElementById('results')
      let p = document.createElement('p');
      p.id = 'correct';
      p.appendChild(result);
      display.appendChild(p);
  })
}
