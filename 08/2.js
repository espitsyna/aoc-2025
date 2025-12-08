const fs = require('node:fs');

const data = fs.readFileSync('data.txt', 'utf8').split('\r\n').filter(Boolean).map(line => line.split(',').map(Number));

const distance = ([x1, y1, z1], [x2, y2, z2]) => Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2);

const pairs = [];
for (let i = 0; i < data.length; i++) {
    for (let j = i+1; j < data.length; j++) {
        pairs.push({ i, j, distance: distance(data[i], data[j]) });
    }
}

pairs.sort(({ distance: a }, { distance: b }) => a - b);

const connections = {};

for (let n = 0; n < pairs.length; n++) {
    const { i, j } = pairs[n];

    const a = connections[i];
    const b = connections[j];

    if (a !== undefined || b !== undefined) {
        Object.entries(connections).forEach(([ light, circuit ]) => {
            if (circuit === a || circuit === b) {
                connections[light] = n;
            }
        });
    }

    connections[i] = n;
    connections[j] = n;

    if (Object.keys(connections).length === data.length && Object.values(connections).every(circuit => circuit === n)) {
        const [x1] = data[i];
        const [x2] = data[j];
        console.log(x1 * x2);
        break;
    }
}
