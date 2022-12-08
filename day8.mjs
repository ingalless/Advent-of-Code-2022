import fs from 'fs'

const input = fs.readFileSync('day8.txt', { encoding: 'utf8' })
const rows = input.split('\n').filter(Boolean)

const MAX_X = rows[0].length - 1;
const MAX_Y = rows.length - 1;



function partOne() {
    function left(size, x, y) {
        let passed = true;
        for (x--; x >= 0; x--) {
            if (Number(rows[y][x]) >= size) {
                passed = false;
                break;
            }
        }
        return passed;
    }

    function right(size, x, y) {
        let passed = true;
        for (x++; x <= MAX_X; x++) {
            if (Number(rows[y][x]) >= size) {
                passed = false;
                break;
            }
        }
        return passed;
    }

    function up(size, x, y) {
        let passed = true;
        for (y--; y >= 0; y--) {
            if (Number(rows[y][x]) >= size) {
                passed = false;
                break;
            }
        }
        return passed;
    }

    function down(size, x, y) {
        let passed = true;
        for (y++; y <= MAX_Y; y++) {
            if (Number(rows[y][x]) >= size) {
                passed = false;
                break;
            }
        }
        return passed;
    }
    console.log('GRID')
    console.log('-', '01234')
    for (let i = 0; i < rows.length; i++) {
        console.log(i, rows[i])
    }
    console.log('-----')

    let count = 0;
    for (let x = 0; x <= MAX_X; x++) {
        for (let y = 0; y <= MAX_Y; y++) {
            const size = Number(rows[y][x])
            if (y === 0 || y === MAX_Y || x === 0 || x === MAX_X) {
                count++;
            } else if (left(size, x, y)) {
                count++;
            } else if (right(size, x, y)) {
                count++
            } else if (up(size, x, y)) {
                count++
            } else if (down(size, x, y)) {
                count++
            }

        }
    }
    return count;
}

function partTwo() {
    function left(size, x, y) {
        let score = 0;
        for (x--; x >= 0; x--) {
            score++
            if (Number(rows[y][x]) >= size) {
                break;
            }
        }
        return score;
    }

    function right(size, x, y) {
        let score = 0;
        for (x++; x <= MAX_X; x++) {
            score++
            if (Number(rows[y][x]) >= size) {
                break;
            }
        }
        return score;
    }

    function up(size, x, y) {
        let score = 0;
        for (y--; y >= 0; y--) {
            score++
            if (Number(rows[y][x]) >= size) {
                break;
            }
        }
        return score;
    }

    function down(size, x, y) {
        let score = 0;
        for (y++; y <= MAX_Y; y++) {
            score++
            if (Number(rows[y][x]) >= size) {
                break;
            }
        }
        return score;
    }

    let highest = 0;
    for (let x = 0; x <= MAX_X; x++) {
        for (let y = 0; y <= MAX_Y; y++) {
            const size = Number(rows[y][x])
            const scores = [left(size, x, y), right(size, x, y), up(size, x, y), down(size, x, y)]
            let score = null;
            for (const s of scores) {
                if (score === null) {
                    score = s
                } else {
                    score = score * s
                }
            }
            
            if (score > highest) {
                highest = score;
            }
        }
    }
    return highest;

}

console.log('Part 1', partOne())
console.log('Part 2', partTwo())
