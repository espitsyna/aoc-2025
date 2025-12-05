const fs = require('node:fs');

const [instructions, ids] = fs.readFileSync('data.txt', 'utf8').split('\r\n\r\n');

const ranges = [];

instructions.split('\r\n').forEach(instruction => {
    const [a, b] = instruction.split('-').map(Number);

    const merge = ranges.findIndex(([start, end]) => (a >= start && a <= end) || (b >= start && b <= end));
    if (merge !== -1) {
        const [start, end] = ranges[merge];
        ranges[merge] = [Math.min(a, start), Math.max(b, end)];
    } else {
        ranges.push([a, b]);
    }
});

const result = ids.split('\r\n').reduce((acc, id) => {
    const num = +id;
    const found = ranges.some(([start, end]) => start <= num && end >= num);
    return acc + (found ? 1 : 0);
}, 0);

console.log(result);
