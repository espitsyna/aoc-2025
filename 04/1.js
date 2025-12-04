const fs = require('node:fs');

const data = fs.readFileSync('data.txt', 'utf8');

const map = data.split('\r\n').filter(Boolean).map(line => line.split(''));

const result = map.reduce((acc, line, i) =>
    acc + line.reduce((acc, element, j) => {
        if (element !== '@') {
            return acc;
        }
        const neighbours = [
            [i-1, j-1], [i-1, j], [i-1, j+1],
            [i, j-1], [i, j+1],
            [i+1, j-1], [i+1, j], [i+1, j+1],
        ];

        const count = neighbours.reduce((acc, [a, b]) => {
            const neighbour = (map[a] || [])[b];
            return acc + (neighbour === '@' ? 1 : 0);
        }, 0);

        return acc + (count < 4 ? 1 : 0);
    }, 0), 0
);

console.log(result);
