import fs from 'fs'

const input = fs.readFileSync('day1.txt', { encoding: 'utf8' })
const parsedInput = input.split('\n\n')

const elves = [];
for (const i of parsedInput) {
    const total = i.split('\n').reduce((prev, curr) => Number(prev) + Number(curr), 0)
    elves.push(total)
}

elves.sort((a, b) => b - a);

console.log('Highest total is', elves[0])
console.log('Sum of top 3 is', elves[0] + elves[1] + elves[2])
