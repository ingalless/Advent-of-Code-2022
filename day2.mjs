import fs from 'fs'

const input = fs.readFileSync('day2.txt', { encoding: 'utf8' })


function calculateBonus(me, them) {
    let bonus = 0;
    if (me === them) {
        bonus = 3
    }
    if (me === 'rock') {
        if (them === 'scissors') {
            bonus = 6
        } else if (them === 'paper') {
            bonus = 0
        }
    }

    if (me === 'scissors') {
        if (them === 'rock') {
            bonus = 0
        } else if (them === 'paper') {
            bonus = 6
        }
    }

    if (me === 'paper') {
        if (them === 'rock') {
            bonus = 6
        } else if (them === 'scissors') {
            bonus = 0
        }
    }

    return bonus
}


function partOne() {
    const actions = {
        A: {
            score: 1,
            action: 'rock'
        },
        B: {
            score: 2,
            action: 'paper'
        },
        C: {
            score: 3,
            action: 'scissors'
        },
        X: {
            score: 1,
            action: 'rock'
        },
        Y: {
            score: 2,
            action: 'paper'
        },
        Z: {
            score: 3,
            action: 'scissors'
        }
    }
    let score = 0;
    for (const round of input.split('\n').filter(Boolean)) {
        const [opponent, me] = round.split(' ');
        const baseScore = actions[me].score

        const myAction = actions[me].action
        const theirAction = actions[opponent].action

        let bonus = calculateBonus(myAction, theirAction)

        score += (baseScore + bonus);
    }
    return score
}

function partTwo() {
    const actions = {
        A: {
            score: 1,
            action: 'rock'
        },
        B: {
            score: 2,
            action: 'paper'
        },
        C: {
            score: 3,
            action: 'scissors'
        },
        X: 'lose',
        Y: 'draw',
        Z: 'win',
    }
    const bonuses = {lose: 0,draw: 3, win: 6}
    const scores = { rock: 1, paper: 2, scissors: 3 }

    let score = 0;

    for (const round of input.split('\n').filter(Boolean)) {
        const [opponent, me] = round.split(' ');
        const outcomeMustBe = actions[me]
        const theirAction = actions[opponent].action

        let baseScore = bonuses[outcomeMustBe];
        let bonus = 0;
        if (theirAction === 'rock') {
            if (outcomeMustBe === 'lose') {
                bonus = scores.scissors
            } else if (outcomeMustBe === 'draw') {
                bonus = scores.rock
            } else {
                bonus = scores.paper
            }
        }

        if (theirAction === 'paper') {
            if (outcomeMustBe === 'lose') {
                bonus = scores.rock
            } else if (outcomeMustBe === 'draw') {
                bonus = scores.paper
            } else {
                bonus = scores.scissors
            }
        }
        
        if (theirAction === 'scissors') {
            if (outcomeMustBe === 'lose') {
                bonus = scores.paper
            } else if (outcomeMustBe === 'draw') {
                bonus = scores.scissors
            } else {
                bonus = scores.rock
            }
        }

        score += (baseScore + bonus);
    }
    return score
}

console.log('Part 1: ', partOne())
console.log('Part 2: ', partTwo())
