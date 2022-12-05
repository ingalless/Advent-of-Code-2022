import fs from 'fs'

const input = fs.readFileSync('day4.txt', { encoding: 'utf8' })
const rows = input.split('\n').filter(Boolean);

function fillNums(start, end) {
    let string = '';
    for (let i = start; i <= end; i++) {
        string += `<${i}>`
    }
    return string
}
function partOne() {
    let count = 0;
    for (const row of rows) {
        const [first, second] = row.split(',');
        const firstNums = fillNums(...first.split('-').map(Number))
        const secondNums = fillNums(...second.split('-').map(Number))
        if (firstNums.includes(secondNums) || secondNums.includes(firstNums)) {
            count++
        }
    }

    return count;
}
function partTwo() {
    let count = 0;
    for (const row of rows) {
        const [firstPair, secondPair] = row.split(',');
        const first = firstPair.split('-').map(Number)
        const second = secondPair.split('-').map(Number)
        const firstNums = fillNums(...first)
        const secondNums = fillNums(...second)
        let found = false;
        for (let i = first[0]; i <= first[1]; i++) {
            if (secondNums.includes(`<${i}>`)) {
                found = true;
                count++;
                break;
            }
        }
        if (found) {
            continue;
        }
        for (let i = second[0]; i <= second[1]; i++) {
            if (firstNums.includes(`<${i}>`)) {
                count++;
                break;
            }
        }
    }

    return count;
}

console.log(partOne())
console.log(partTwo())
