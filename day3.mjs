import fs from 'fs'

const input = fs.readFileSync('day3.txt', { encoding: 'utf8' })

const letters = fs.readFileSync('letters.txt', { encoding: 'utf8' })


function partOne() {
    let totals = [];
    for (const rucksack of input.split('\n').filter(Boolean)) {
        const len = rucksack.length
        const cLen = len / 2
        const firstCom = rucksack.slice(0, cLen)
        const secondCom = rucksack.slice(cLen)
        let inBoth;
        for (const c of firstCom) {
            if (!secondCom.includes(c)) continue;
            inBoth = c
            break;
        }
        totals.push(letters.indexOf(inBoth) + 1)
    }
    return totals.reduce((a, b) => a + b, 0)
}

function partTwo() {
    let totals = [];
    const rows = input.split('\n').filter(Boolean)
    for (let i = 0; i < rows.length; i += 3) {
        let inAllThree;
        for (const c of rows[i]) {
            if (rows[i + 1].includes(c) && rows[i + 2].includes(c)) {
                inAllThree = c;
                break;
            }
        }
        console.log(inAllThree, rows[i], rows[i + 1], rows[i + 2])
        totals.push(letters.indexOf(inAllThree) + 1)
    }
    return totals.reduce((a, b) => a + b, 0)
}

console.log(partOne())
console.log(partTwo())
