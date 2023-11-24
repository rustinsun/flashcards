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
    console.log('Выберите тему квиза:');
    console.log('1. Животные');
    console.log('2. Фрукты');
    rl.question('Введите номер выбранной темы: ', (theme) => {
      switch (theme) {
        case '1':
          this.addAnimalQuestions();
          break;
        case '2':
          this.addFruitQuestions();
          break;
        default:
          console.log('Недопустимый номер темы.');
          rl.close();
          return;
      }
      rl.question('Введите ваше имя: ', (name) => {
        this.playerName = name;
        this.displayNextQuestion();
      });
    });
  }

  addAnimalQuestions() {
    this.questions.push(
      { question: 'Как на английский переводится "осёл"?', answer: 'donkey' },
      { question: 'Как на английский переводится "ёж"?', answer: 'hedgehog' },
      { question: 'Как на английский переводится "крыса"?', answer: 'rat' },
      { question: 'Как на английский переводится "коза"?', answer: 'goat' },
      { question: 'Как на английский переводится "лошадь"?', answer: 'horse' }
    );
  }

  addFruitQuestions() {
    this.questions.push(
      { question: 'Как на английский переводится "яблоко"?', answer: 'apple' },
      { question: 'Как на английский переводится "банан"?', answer: 'banana' },
      { question: 'Как на английский переводится "апельсин"?', answer: 'orange' },
      { question: 'Как на английский переводится "груша"?', answer: 'pear' },
      { question: 'Как на английский переводится "вишня"?', answer: 'cherry' }
    );
  }

  displayNextQuestion() {
    if (this.currentQuestionIndex === this.questions.length) {
      this.displayScore();
      rl.close();
      return;
    }

    const currentQuestion = this.questions[this.currentQuestionIndex];

    rl.question(`${currentQuestion.question}` , (userAnswer) => {
      if (userAnswer.toLowerCase().trim() === currentQuestion.answer.toLowerCase()) {
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

quiz.startQuiz();