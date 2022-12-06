import fs from 'fs'

const input = fs.readFileSync('day6.txt', { encoding: 'utf8' })

function solve(length) {
    let pos = 0;
    for (let i = length; i <= input.length; i++) {
        const slice = input.slice(i - length, i)
        let string = '';
        let hasDup = false;
        for (const ch of slice) {
            if (string.includes(ch)) {
                hasDup = true;
                break;
            }
            string += ch
        }
        if (!hasDup) {
            pos = i;
            break;
        }
    }
    return pos;
}

console.log(solve(4));
console.log(solve(14));
