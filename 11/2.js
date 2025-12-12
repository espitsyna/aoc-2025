const fs = require('node:fs');

const data = fs.readFileSync('data.txt', 'utf8').split('\r\n').filter(Boolean).reduce((acc, line) => {
    const [from, direction] = line.split(':');
    const to = direction.split(' ').filter(Boolean);

    return {
        ...acc,
        [from]: [...(acc[from] || []), ...to],
    };
}, {});

const count = (start, finish) => {
    const memo = {};

    const iterate = (positions, finish) => {
        return positions.reduce((acc, position) => {
            if (memo[position] !== undefined) {
                return acc + memo[position];
            }
            if (position === finish) {
                return acc + 1;
            }
            if (!data[position]) {
                return acc;
            }
            const result = iterate(data[position], finish);
            memo[position] = result;

            return acc + result;
        }, 0);
    };

    return iterate([start], finish);
};

const a = count('svr', 'fft') * count('fft', 'dac') * count('dac', 'out');
const b = count('svr', 'dac') * count('dac', 'fft') * count('fft', 'out');

console.log(a+b);
