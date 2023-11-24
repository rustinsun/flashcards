const readline = require('readline');
const fs = require('fs');
const chalk = require('chalk');
const { questionObj, questionObj2 } = require('./QuestionClass');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
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
    rl.question(chalk.magenta('Введите ваше имя: '), (name) => {
      this.playerName = name;

      console.log(chalk.green('Выберите тему квиза:'));
      console.log('1. Животные');
      console.log('2. Профессии');
      rl.question(chalk.green('Введите номер выбранной темы: '), (theme) => {
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
        }
        this.displayNextQuestion();
      });
    });
  }

  addAnimalQuestions() {
    questionObj.forEach((el) => {
      this.questions.push(el);
    });
  }

  addFruitQuestions() {
    questionObj2.forEach((el) => {
      this.questions.push(el);
    });
  }

  displayNextQuestion() {
    if (this.currentQuestionIndex === this.questions.length) {
      this.displayScore();
      rl.close();
      return;
    }

    const currentQuestion = this.questions[this.currentQuestionIndex];

    rl.question(chalk.magenta(`${currentQuestion.question}`), (userAnswer) => {
      if (
        userAnswer.toLowerCase().trim() === currentQuestion.answer.toLowerCase()
      ) {
        console.log(chalk.cyanBright('Молодец, ты поедешь на Бали!'));
        this.score += 100;
      } else {
        console.log(chalk.yellowBright('Oopps! В следующий раз...'));
      }

      this.currentQuestionIndex++;
      this.displayNextQuestion();
    });
  }

  displayScore() {
    console.log(
      chalk.bgGreenBright(
        `Конец квиза, ${this.playerName}. Ваш счет: ${this.score}/${
          this.questions.length * 100
        }`
      )
    );
  }
}

// Пример использования класса Quiz
const quiz = new Quiz();

quiz.startQuiz();
