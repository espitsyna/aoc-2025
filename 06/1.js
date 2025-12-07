const fs = require('node:fs');

const data = fs.readFileSync('data.txt', 'utf8').split('\r\n').filter(Boolean).map(line => line.split(' ').filter(Boolean));
const numbers = data.slice(0, data.length  - 1).map(line => line.map(Number));

const result = data.at(-1).reduce(
    (acc, operator, i) =>
        acc + numbers.reduce((acc, line) => operator === '+' ? acc + line[i] : acc * line[i], operator === '+' ? 0 : 1),
    0);

console.log(result);
