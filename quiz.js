const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Quiz {
  constructor() {
    this.questions = [];
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.playerName = '';
  }

  addQuestion(question, answer) {
    this.questions.push({ question, answer });
  }

  startQuiz() {
    console.log('Начинаем квиз!');
    rl.question('Введите ваше имя: ', (name) => {
      this.playerName = name;
      this.displayNextQuestion();
    });
  }

  displayNextQuestion() {
    if (this.currentQuestionIndex === this.questions.length) {
      this.displayScore();
      rl.close();
      return;
    }

    const currentQuestion = this.questions[this.currentQuestionIndex];

    rl.question(`${currentQuestion.question}` , (userAnswer) => {
      if (userAnswer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
        console.log('Правильный ответ!');
        this.score++;
      } else {
        console.log('Неправильный ответ!');
      }

      this.currentQuestionIndex++;
      this.displayNextQuestion();
    });
  }

  displayScore() {
    console.log(`Конец квиза, ${this.playerName}. Ваш счет: ${this.score}/${this.questions.length}`);
  }
}

// Пример использования класса Quiz
const quiz = new Quiz();

quiz.addQuestion('Как на английский переводится "осёл"?', 'donkey');
quiz.addQuestion('Как на английский переводится "ёж"?', 'hedgehog');
quiz.addQuestion('Как на английский переводится "крыса"?', 'rat');
quiz.addQuestion('Как на английский переводится "коза"?', 'goat');
quiz.addQuestion('Как на английский переводится  "лошадь"?', 'horse');

quiz.startQuiz();