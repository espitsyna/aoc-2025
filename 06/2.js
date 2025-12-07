const fs = require('node:fs');

const data = fs.readFileSync('data.txt', 'utf8').split('\r\n').filter(Boolean).map(line => line.split(''));
const numbers = data.slice(0, data.length - 1);
const operators = data.at(-1);

let operator;
let acc = 0;
let result = 0;

const max = Math.max(...data.map(line => line.length));

for (let i = 0; i < max; i++) {
    if (['+', '*'].includes(operators[i])) {
        result += acc;
        operator = operators[i];
        acc = operator === '+' ? 0 : 1;
    };

    if (!numbers.some(line => line[i] && line[i] !== ' ')) {
        continue;
    }

    const number = numbers.reduce((acc, line) => line[i] === ' ' || !line[i] ? acc : acc * 10 + +line[i], 0);
    acc = operator === '+' ? acc + number : acc * number;
}

console.log(result + acc);
