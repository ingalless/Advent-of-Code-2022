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
function partOneButWithString() {
    let count = 0;
    for (const row of rows) {
        const [first, second] = row.split(',');
        const firstNums = fillNums(...first.split('-'))
        const secondNums = fillNums(...second.split('-'))
        if (firstNums.includes(secondNums) || secondNums.includes(firstNums)) {
            count++
        }
    }

    return count;
}

function partOne() {
    let count = 0;
    for (const row of rows) {
        const [pair1, pair2] = row.split(',');
        const first = pair1.split('-').map(Number)
        const second = pair2.split('-').map(Number)
        if (first[0] > second[0]) {
            if (first[1] < second[1]) {
                count++
            } else if (first[1] === second[1]) {
                count++
            }
        }
        else if (second[0] > first[0]) {
            if (second[1] < first[1]) {
                count++
            } else if (first[1] === second[1]) {
                count++
            }
        } else {
            count++;
        }
    }
    return count
}

console.log(partOne())
console.log(partOneButWithString())
