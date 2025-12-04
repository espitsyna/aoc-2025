const fs = require('node:fs');

const data = fs.readFileSync('data.txt', 'utf8');

const map = data.split('\r\n').filter(Boolean).map(line => line.split(''));

const iterate = () => map.reduce((acc, line, i) =>
        acc + line.reduce((acc, element, j) => {
            if (element !== '@') {
                return acc;
            }
            const neighbours = [
                [i-1, j-1], [i-1, j], [i-1, j+1],
                [i, j-1], [i, j+1],
                [i+1, j-1], [i+1, j], [i+1, j+1],
            ];

            const pick = neighbours.reduce((acc, [a, b]) => {
                const neighbour = (map[a] || [])[b];
                return acc + (neighbour === '@' ? 1 : 0);
            }, 0) < 4;

            if (pick) {
                map[i][j] = '.';
                return acc + 1;
            }

            return acc;
        }, 0), 0
);

let count = 0;
while (true) {
    const result = iterate();
    if (result === 0) {
        break;
    }

    count += result;
}

console.log(count);
