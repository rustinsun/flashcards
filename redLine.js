const readlineSync = require('readline-sync');
const { questionObj, questionObj2 } = require('./QuestionClass');

const userName = readlineSync.question(
  'Привет тебя ждет настоящее приключение, как тебя зовут? '
);
console.log(`\nПривет  ${userName}  🖖!   Выбери тему 👇 Scores ${0}`);
let Scores = 0;
const option = ['Животные', 'Профессии'];
const index = readlineSync.keyInSelect(option, 'твой Выбор?');

console.log(`Хорошо твой выбор   ${option[index]}  !`);

if (index === 0) {
  const first = readlineSync.question('Как на английский переводится "осёл"? ');
  if (first === 'donkey') {
    Scores += 100;
    console.log(
      `Поздравляем donkey правельный ответ!\n\nTы заработал 100 баллов твой Scores: ${Scores}`
    );
  }
}
