const fs = require('node:fs');

const data = fs.readFileSync('data.txt', 'utf8');

const result = data.split('\n').filter(Boolean).reduce((acc, bank) => {
    const batteries = bank.split('').map(Number);
    const a = Math.max(...batteries.slice(0, batteries.length-2));
    const position = batteries.findIndex(battery => battery === a);
    const b = Math.max(...batteries.slice(position + 1));
    return acc + a * 10 + b;
}, 0);

console.log(result);
