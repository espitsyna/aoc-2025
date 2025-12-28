const fs = require('node:fs');

const data = fs.readFileSync('data.txt', 'utf8').split('\r\n').filter(Boolean).map(line => {
    const [_, ...instructions] = line.split(' ');
    const buttons = instructions.slice(0, instructions.length -1 );
    const levels = instructions.at(-1);

    return {
        levels: levels.slice(1, levels.length -1).split(',').map(Number),
        buttons: buttons.map(line => line.slice(1, line.length -1).split(',').map(Number)),
    };
});

const buildMap = (buttons, levels) => {
    const map = {};
    const count = Math.pow(2, buttons.length);
    for (let i = 0; i < count; i++) {
        const pattern = '.'.repeat(levels.length).split('');
        const buttonsPressed = `${i.toString(2)}`.padStart(buttons.length, '0').split('');
        buttonsPressed.forEach((pressed, index) => {
            if (pressed === '1') {
                const button = buttons[index];
                button.forEach(el => pattern[el] = pattern[el] === '.' ? '#' : '.');
            }
        });

        map[pattern.join('')] = [...(map[pattern.join('')] ?? []), buttonsPressed];
    }

    return map;
};

const run = ({ buttons, levels }) => {
    const map = buildMap(buttons, levels);

    const iterate = levels => {
        if (levels.every(el => el === 0)) {
            return 0;
        }
        const pattern = levels.map(level => level % 2 ? '#' : '.').join('');
        const combinations = map[pattern];

        if (!combinations) {
            return Number.MAX_VALUE;
        }

        return Math.min(...combinations.map(combination => {
            const next = [...levels];
            combination.forEach((pressed, index) => {
                if (pressed === '1') {
                    buttons[index].forEach(el => next[el] = next[el] - 1);
                }
            });

            if (next.some(el => el < 0)) {
                return Number.MAX_VALUE;
            }

            return 2 * iterate(next.map(el => el / 2)) + combination.filter(el => el === '1').length;
        }));
    };

    return iterate(levels, 0);
};

const result = data.reduce((acc, machine, index) => {
    const count = run(machine);
    console.log(`machine #${index} result ${count}`);
    return acc + count;
}, 0);
console.log(result);
