import fs from 'fs'

const input = fs.readFileSync('day8-sample.txt', { encoding: 'utf8' })
const rows = input.split('\n').filter(Boolean)

const MAX_X = rows[0].length - 1;
const MAX_Y = rows.length - 1;

const key = (x, y) => [x, y].join('')

function buildGrid() {
    let grid = new Map();

    for (let y = 0; y <= MAX_Y; y++) {
        for (let x = 0; x <= MAX_X; x++) {
            grid.set(key(x, y), Number(rows[y][x]));
        }
    }

    return grid;
}

function tryLeft(size, startX, y, grid) {
    let failed = false;
    for (let x = startX; x >= 0; x--) {
        const nextTree = grid.get(key(x, y));
        failed = size <= nextTree
        size = nextTree;
        if (failed) {
            break;
        }
    }
    return failed === false;
}

function tryRight(size, startX, y, grid) {
    let failed = false;
    for (let x = startX; x <= MAX_X; x++) {
        const nextTree = grid.get(key(x, y));
        failed = size <= nextTree
        size = nextTree;
        if (failed) {
            break;
        }
    }
    return failed === false;
}

function tryUp(size, x, startY, grid) {
    let failed = false;
    for (let y = startY; y >= 0; y--) {
        const nextTree = grid.get(key(x, y));
        failed = size <= nextTree
        size = nextTree;
        if (failed) {
            break;
        }
    }
    return failed === false;
}

function tryDown(size, x, startY, grid) {
    let failed = false;
    for (let y = startY; y <= MAX_Y; y++) {
        const nextTree = grid.get(key(x, y));
        failed = size <= nextTree
        size = nextTree;
        if (failed) {
            break;
        }
    }
    return failed === false;
}

function partOne() {
    const grid = buildGrid()


    console.log('GRID')
    console.log(input)
    console.log('-----')

    let count = 0;
    for (let x = 0; x <= MAX_X; x++) {
        for (let y = 0; y <= MAX_Y; y++) {
            const size = grid.get(key(x, y))
            if (y === 0 || y === MAX_Y || x === 0 || x === MAX_X) {
                count++;
            } else if (tryLeft(size, x - 1, y, grid)) {
                console.log('ADDED LEFT', [x, y])
                count++;
            } else if (tryRight(size, x + 1, y, grid)) {
                console.log('ADDED RIGHT', [x, y])
                count++;
            }
        }
    }
    return count;
}

function partTwo() {
}

console.log('Part 1', partOne())
console.log('Part 2', partTwo())
