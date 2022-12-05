import fs from 'fs'

const input = fs.readFileSync('day5.txt', { encoding: 'utf8' })

function init() {
    const [initLines, instructionLines] = input.split('\n\n')
    const initState = initLines.split('\n')
    let stacks = {}
    for (const stack of initState.pop().replace(/\s/g, '').split('')) {
        stacks[stack - 1] = [];
    }
    for (const line of initState.reverse()) {
        for (let i = 0; i <= line.length; i += 4) {
            const formatted = line.substring(i, i + 4).replace('[', '').replace(']', '').trim()
            if (formatted.length) {
                stacks[i / 4].push(formatted)
            }
        }
    }
    const instructions = instructionLines.split('\n').filter(Boolean).map(i => {
        const [quantity, from, to] = i.matchAll(/[0-9]+/g)
        return {
            quantity: Number(quantity),
            from: Number(from),
            to: Number(to)
        }
    })
    return [stacks, instructions]
}

function partOne() {
    const [state, instructions] = init()
    for (const instruction of instructions) {
        const fromIndex = instruction.from - 1;
        const toIndex = instruction.to - 1;
        for (let i = 0; i < instruction.quantity; i++) {
            state[toIndex].push(state[fromIndex].pop())
        }
    }

    let string = ''
    for (let i = 0; i < Object.keys(state).length; i++) {
        string += state[i].pop()
    }
    return string
}

function partTwo() {
    const [state, instructions] = init()
    for (const instruction of instructions) {
        const fromIndex = instruction.from - 1;
        const toIndex = instruction.to - 1;
        const toMove = state[fromIndex]
            .splice(
                state[fromIndex].length - instruction.quantity,
                instruction.quantity
            )
        for (const i of toMove) {
            state[toIndex].push(i)
        }
    }

    let string = ''
    for (let i = 0; i < Object.keys(state).length; i++) {
        string += state[i].pop()
    }
    return string
}

console.log(partOne())
console.log(partTwo())
