const fs = require('node:fs');

const [instructions] = fs.readFileSync('data.txt', 'utf8').split('\r\n\r\n');

let ranges = [];

instructions.split('\r\n').forEach(instruction => {
    const [a, b] = instruction.split('-').map(Number);

    const intersect = ranges.map(([start, end], i) => (a >= start && a <= end) || (b >= start && b <= end) ? i : -1).filter(i => i !== -1);
    const inner = ranges.map(([start, end], i) => (a <= start && b >= end) ? i : -1).filter(i => i !== -1);
    const outer = ranges.map(([start, end], i) => (a >= start && b <= end) ? i : -1).filter(i => i !== -1);

    const ids = new Set([...intersect, ...inner, ...outer]);
    if (ids.size === 0) {
        ranges.push([a, b]);
    } else {
        const merge = [...ids.values()].map(id => ranges[id]);
        const start = Math.min(...merge.map(([start]) => start), a);
        const end = Math.max(...merge.map(([_, end]) => end), b);

        ranges = ranges.filter(range => !merge.includes(range));
        ranges.push([start, end]);
    }
});

const result = ranges.reduce((acc, [start, end]) => acc + end - start +1, 0);

console.log(result);
