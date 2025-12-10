const fs = require('node:fs');

const data = fs.readFileSync('data.txt', 'utf8').split('\r\n').filter(Boolean).map(line => {
    const [pattern, ...instructions] = line.split(' ');
    const buttons = instructions.slice(0, instructions.length -1 );

    return {
        pattern: pattern.slice(1, pattern.length - 1),
        buttons: buttons.map(line => line.slice(1, line.length -1).split(',').map(Number)),
    };
});

const apply = (lights, button) => lights.map((light, i) => button.includes(i) ? light === '.' ? '#' : '.' : light);

const iterate = (lights, buttons, pattern) => {
    const sequences = [];
    for (let i = 0; i < buttons.length; i++) {
        const sequence = apply(lights, buttons[i]);
        if (sequence.join('') === pattern) {
            return null;
        }
        sequences.push(sequence);
    }
    return sequences;
};

const result = data.reduce((acc, { pattern, buttons }) => {
    let sequences = [pattern.split('').map(() => '.')];
    let count = 0;

    while (true) {
        count++;

        const aggregate = new Set();
        for (let i = 0; i < sequences.length; i++) {
            const next = iterate(sequences[i], buttons, pattern);
            if (!next) {
                return acc + count;
            }
            next.forEach(n => aggregate.add(n));
        }

        sequences = [...aggregate];
    }
}, 0);

console.log(result);
