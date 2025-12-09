const fs = require('node:fs');

const data = fs.readFileSync('data.txt', 'utf8').split('\r\n').filter(Boolean).map(line => line.split(',').map(Number));

let max = 0;

for (let i = 0; i < data.length; i++) {
    for (let j = i+1; j < data.length; j++) {
        const [a1, b1] = data[i];
        const [a2, b2] = data[j];
        const area = (Math.abs(a1 - a2) + 1) * (Math.abs(b1 - b2) + 1);
        if (area > max) {
            max = area;
        }
    }
}

console.log(max);
