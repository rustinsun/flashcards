const { EOL } = require('os');
const fs = require('fs');
const inquirer = require('inquirer');
const chalk = require('chalk')
const quest = fs.readFileSync('./topics/data.txt', 'utf8').split(EOL);
const answ = fs.readFileSync('./topics/answ.txt', 'utf8').split(EOL);
const tema = fs.readFileSync('./topics/tema.txt', 'utf8').split(EOL);
const answ2 = fs.readFileSync('./topics/answ2.txt', 'utf8').split(EOL);

const questions = [
  { type: 'input', name: 'username', message: 'Введи имя:' },
  {
    type: 'list',
    name: 'bonuses1',
    // tema: `${tema[0]}`,
    message: `${tema[0]}:${quest[0]}`,
    choices: [
      { name: answ[0], value: 1 },
      { name: answ2[0], value: -1 },
    ],
  },
  {
    type: 'list',
    name: 'bonuses2',
    message: `${tema[1]}:${quest[1]}`,
    choices: [
      { name: answ[1], value: 1 },
      { name: answ2[1], value: -1 },
    ],
  },
  {
    type: 'list',
    name: 'bonuses3',
    message: `${tema[2]}:${quest[2]}`,
    choices: [
      { name: answ[2], value: 1 },
      { name: answ2[2], value: -1 },
    ],
  },
];

const calculateScore = (answers) => {
  let score = 0;
  score += answers.bonuses1;
  score += answers.bonuses2;
  score += answers.bonuses3;
  return score;
};

inquirer.prompt(questions).then((answers) => {
  console.log('\nРезультаты:');
  questions.forEach((question, i) => {
    if (i !== 0) {
        const right = answers[`bonuses${i}`] === 1;
        const rightAnsw = right ? chalk.green('Правильно') : chalk.red('Неправильно');

      console.log(`Тема: ${tema[i - 1]}`);
      console.log(`Вопрос: ${quest[i - 1]}`);
      console.log(`Ответ: ${question.choices[0].name}`);
      console.log(`Балл: ${answers[`bonuses${i}`]}`);
      console.log(`Результат: ${rightAnsw}`);
      console.log('-------------------------');
    }
  });

  const totalScore = calculateScore(answers);
  console.log(`Общий счет: ${totalScore}`);
});

