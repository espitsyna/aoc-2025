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

Object.keys([...new Array(1000)]).forEach(n => {
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
});

const circuits = {};

Object.values(connections).forEach(circuit => {
    circuits[circuit] = (circuits[circuit] ?? 0) + 1;
});

const sizes = Object.values(circuits);
sizes.sort((a, b) => b - a);

const result = sizes.slice(0, 3).reduce((acc, count) => acc * count, 1);

console.log(result);
