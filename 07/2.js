const fs = require('node:fs');

const data = fs.readFileSync('data.txt', 'utf8').split('\r\n').filter(Boolean).map(line => line.split(''));

const positions = data.reduce((positions, line) => {
    if (!positions) {
        return {
            [line.findIndex(el => el === 'S')]: 1,
        };
    }

    return Object.entries(positions).reduce((acc, [position, count]) => {
        const index = +position;
        if (line[index] === '.') {
            return {...acc, [index]: (acc[index] ?? 0) + count};
        }

        if (index > 0) {
            acc[index - 1] = (acc[index - 1] ?? 0) + count;
        }

        if (index < line.length - 1) {
            acc[index + 1] = (acc[index + 1] ?? 0) + count;
        }
        return acc;
    }, {});
}, null);

console.log(Object.values(positions).reduce((acc, count) => acc + count, 0));
