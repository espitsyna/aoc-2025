const fs = require('node:fs');

const data = fs.readFileSync('data.txt', 'utf8');

const isRepeated = (word, substring) => {
    const max = Math.floor(word.length / substring.length);
    for (let i = 2; i <= max; i++) {
        if (substring.repeat(i) === word) {
            return true;
        }
    }

    return false;
};

const test = word => word.split('').some((_, i) => isRepeated(word, word.substring(0, i+1)));

const result = data.split(',').reduce((acc, line) => {
    const [start, end] = line.split('-').map(Number);
    const ids = [];
    for (let id = start; id <= end; id++) {
        if (test(`${id}`)) {
            ids.push(id);
        }
    }

    return acc + ids.reduce((acc, id) => acc + id, 0);
}, 0);

console.log(result);
