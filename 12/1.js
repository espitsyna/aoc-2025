const fs = require('node:fs');

const data = fs.readFileSync('data.txt', 'utf8').split('\r\n');
const presents = [];
const regions = [];

for (let i = 0; i < 6; i++) {
    const shape = data.slice(5 * i + 1, 5 * i + 4);
    const volume = shape.reduce((acc, line) => acc + line.split('').reduce((acc, el) => acc + (el === '#' ? 1 : 0), 0), 0);
    presents.push(volume);
}

data.slice(5 * 5 + 5).filter(Boolean).map(line => {
    const [dimensions, count] = line.split(':');
    const [x, y] = dimensions.split('x').map(Number);
    regions.push({
        x,
        y,
        count: count.split(' ').filter(Boolean).map(Number),
    });
});

const fit = regions.filter(({ x, y, count }) => count.reduce((acc, amount, i) => acc + amount * presents[i], 0) < x * y);
console.log(fit.length);
