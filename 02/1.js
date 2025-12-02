const fs = require('node:fs');

const data = fs.readFileSync('data.txt', 'utf8');

const result = data.split(',').reduce((acc, line) => {
    const [start, end] = line.split('-').map(Number);
    const ids = [];
    for (let id = start; id <= end; id++) {
        const word = `${id}`;
        if (word.length % 2 === 1) {
            continue;
        }

        const first = word.substring(0, word.length / 2);
        const second = word.substring(word.length / 2);

        if (first === second) {
            ids.push(id);
        }
    }

    return acc + ids.reduce((acc, id) => acc + id, 0);
}, 0);

console.log(result);
