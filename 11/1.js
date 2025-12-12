const fs = require('node:fs');

const data = fs.readFileSync('data.txt', 'utf8').split('\r\n').filter(Boolean).reduce((acc, line) => {
    const [from, to] = line.split(':');
    return {
        ...acc,
        [from]: [...(acc[from] || []), ...to.split(' ').filter(Boolean)],
    };
}, {});
const iterate = positions => {
    return positions.reduce((acc, position) => {
        if (position === 'out') {
            return acc + 1;
        }
        return acc + iterate(data[position]);
    }, 0);
};


console.log(iterate(['you']));
