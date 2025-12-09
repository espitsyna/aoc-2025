const fs = require('node:fs');

const data = fs.readFileSync('data.txt', 'utf8').split('\r\n').filter(Boolean).map(line => line.split(',').map(Number));

const vertical = {};
const horizontal = {};

let x1 = Number.MAX_VALUE;
let x2 = 0;
let y1 = Number.MAX_VALUE;
let y2 = 0;

for (let i = 0; i < data.length; i++) {
    const pairs = [
        [data[i-1] ?? data.at(-1), data[i]],
        [data[i], data[i+1] ?? data[0]],
    ];

    pairs.forEach(([[a1, b1], [a2, b2]]) => {
        if (a1 === a2) {
            const pair = `${Math.min(b1, b2)},${Math.max(b1, b2)}`;
            if (!vertical[a1]) {
                vertical[a1] = new Set();
            }
            vertical[a1].add(pair);
        }

        if (b1 === b2) {
            const pair = `${Math.min(a1, a2)},${Math.max(a1, a2)}`;
            if (!horizontal[b1]) {
                horizontal[b1] = new Set();
            }
            horizontal[b1].add(pair);
        }
    });

    const [x, y] = data[i];
    x1 = Math.min(x, x1);
    x2 = Math.max(x, x2);
    y1 = Math.min(y, y1);
    y2 = Math.max(y, y2);
}

const isOnHorizontal = (a, b) => [...(horizontal[b] || [])].some(line => {
    const [start, end] = line.split(',').map(Number);
    return start <= a && end >= a;
});

const getOnHorizontal = (a, b) => [...(horizontal[b] || [])].filter(line => {
    const [start, end] = line.split(',').map(Number);
    return start <= a && end >= a;
});

const isOnVertical = (a, b) => [...(vertical[a] || [])].some(line => {
    const [start, end] = line.split(',').map(Number);
    return start <= b && end >= b;
});

const getOnVertical = (a, b) => [...(vertical[a] || [])].filter(line => {
    const [start, end] = line.split(',').map(Number);
    return start <= b && end >= b;
});

const map = {};

const checkPoint = ([i , j]) => {
    let a = i;
    while (a >= x1) {
        if (isOnVertical(a, j)) {
            break;
        }
        a--;
    }
    if (a < x1) {
        return false;
    }

    a = i;
    while (a <= x2) {
        if (isOnVertical(a, j)) {
            break;
        }
        a++;
    }

    if (a > x2) {
        return false;
    }

    let b = j;
    while (b >= y1) {
        if (isOnHorizontal(i, b)) {
            break;
        }
        b--;
    }
    if (b < y1) {
        return false;
    }

    b = j;
    while (b <= y2) {
        if (isOnHorizontal(i, b)) {
            break;
        }
        b++;
    }
    if (b > y2) {
        return false;
    }

    return true;
};

const isPointInside = ([i, j]) => {
    const pair = `${i},${j}`;
    if (map[pair] === undefined) {
        map[pair] = checkPoint([i, j]);
    }

    return map[pair];
};

const checkBorder = ([a1, b1], [a2, b2], opposite) => {
    if (a1 === a2) {
        for (let j = Math.min(b1, b2) + 1; j < Math.max(b1, b2); j++) {
            const hasIntersections = getOnHorizontal(a1, j).some(line => {
                const [start, end] = line.split(',').map(Number);
                if (end === a1 && opposite > a1) {
                    return false;
                }
                if (start === a1 && opposite < a1) {
                    return false;
                }
                return true;
            })
            if (hasIntersections) {
                return false;
            }
        }
    } else {
        for (let i = Math.min(a1, a2) + 1; i < Math.max(a1, a2); i++) {
            const hasIntersections = getOnVertical(i, b1).some(line => {
                const [start, end] = line.split(',').map(Number);
                if (end === b1 && opposite > b1) {
                    return false;
                }
                if (start === b1 && opposite < b1) {
                    return false;
                }
                return true;
            })
            if (hasIntersections) {
                return false;
            }
        }
    }

    return true;
};

const checkBorders = ([a1, b1], [a2, b2]) => {
    const borders = [
        [[a1, b1], [a1, b2], a2],
        [[a1, b1], [a2, b1], b2],
        [[a2, b2], [a2, b1], a1],
        [[a2, b2], [a1, b2], b1],
    ];

    return borders.every(([a, b, opposite]) => checkBorder(a, b, opposite));
};

let max = 0;

for (let i = 0; i < data.length; i++) {
    for (let j = i+1; j < data.length; j++) {
        const [a1, b1] = data[i];
        const [a2, b2] = data[j];
        const area = (Math.abs(a1 - a2) + 1) * (Math.abs(b1 - b2) + 1);
        if (area <= max) {
            continue;
        }

        const corners = [[a1, b2], [a2, b1]];
        if (!corners.every(isPointInside)) {
            continue;
        }

        if (!checkBorders([a1, b1], [a2, b2])) {
            continue;
        }

        max = area;
    }
}

console.log(max);
