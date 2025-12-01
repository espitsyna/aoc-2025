const fs = require('node:fs');

const data = fs.readFileSync('data.txt', 'utf8');
let counter = 0;
data.split('\n').filter(Boolean).reduce((acc, line) => {
    const right = line.startsWith('R');
    const distance = +line.substring(1);

    const move = right ? acc + distance : acc - distance;
    const position = (100 * Math.ceil(Math.abs(move) / 100) + move) % 100;

    if (position === 0) {
        counter++;
    }

    return position;
}, 50);

console.log(counter);
