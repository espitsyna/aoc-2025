const fs = require('node:fs');

const data = fs.readFileSync('data.txt', 'utf8');
let counter = 0;
data.split('\n').filter(Boolean).reduce((acc, line) => {
    const right = line.startsWith('R');
    const distance = +line.substring(1);

    const move = right ? acc + distance : acc - distance;

    if (acc > 0 && move < 0) {
        counter++;
    }

    if (move === 0) {
        counter++;
    }

    counter += Math.floor(Math.abs(move) / 100);
    return (100 * Math.ceil(Math.abs(move) / 100) + move) % 100;
}, 50);

console.log(counter);
