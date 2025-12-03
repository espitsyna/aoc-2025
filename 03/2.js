const fs = require('node:fs');

const length = 12;

const data = fs.readFileSync('data.txt', 'utf8');

const find = (batteries, start, index) => {
    const options = batteries.slice(start, batteries.length - length + index);
    const battery = Math.max(...options);
    const position = options.findIndex(value => value === battery);
    return [battery, position + start];
};

const result = data.split('\n').filter(Boolean).reduce((acc, bank) => {
    const batteries = bank.split('').map(Number);
    let start = 0;
    return acc + Object.keys([...new Array(length)]).reduce((acc, i) => {
        const [battery, position] = find(batteries, start, +i);
        start = position + 1;
        return acc + battery * Math.pow(10, length - i - 1);
    }, 0);
}, 0);

console.log(result);
