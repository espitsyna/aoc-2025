const fs = require('node:fs');

const data = fs.readFileSync('data.txt', 'utf8').split('\r\n').filter(Boolean).map(line => line.split(''));

const [count] = data.reduce(([count, positions], line) => {
    if (positions.size === 0) {
        return [0, positions.add(line.findIndex(el => el === 'S'))];
    }

    return [...positions.values()].reduce(([count, positions], index) => {
        if (line[index] === '.') {
            positions.add(index);
            return [count, positions];
        }

        if (index > 0) {
            positions.add(index - 1);
        }

        if (index < line.length - 1) {
            positions.add(index + 1);
        }
        return [count + 1, positions];
    }, [count, new Set()]);
}, [0, new Set()]);

console.log(count);
